#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd());
const TARGETS = ["src"];

const BANNED = [
  { id: "C08", re: /Alan Thicke|Robin Thicke/i, note: "Spokesperson name held" },
  { id: "C08", re: /\bjingle\b/i, note: "Branded jingle held" },
  { id: "C04", re: /\$150\s*M|\b261x\b|\b261×\b|revenue multiple/i, note: "Optima revenue dollars / multiples" },
  { id: "C05", re: /\$3\s*B|>\$3B|3 billion tax|tax liabilities resolved/i, note: "Unverified liability figure" },
  { id: "C06", re: /100,000 cases|100000 cases|>100,000 cases/i, note: "Unverified case count" },
];

const ALLOWED_MAIN_SITE = "https://simplicitymedia.com/results/optima-tax-relief/";

async function walk(entry, files = []) {
  const info = await stat(entry);
  if (info.isDirectory()) {
    const children = await readdir(entry);
    for (const child of children) {
      if (child === "node_modules" || child === ".next") continue;
      await walk(path.join(entry, child), files);
    }
    return files;
  }
  if (/\.(tsx|ts|md|css|mjs|js)$/.test(entry)) files.push(entry);
  return files;
}

const files = [];
for (const target of TARGETS) {
  await walk(path.join(ROOT, target), files);
}

let failed = false;
const required = ["C01", "C02", "C03", "C07", "C09", "C10"];
const copyFile = await readFile(path.join(ROOT, "src/lib/copy.ts"), "utf8");
const requiredSnippets = {
  C01: "26,006%",
  C02: "No. 3 overall",
  C03: "seven consecutive years",
  C07: "low thousands per week",
  C09: "Optima built the service organization",
  C10: "The number is the evidence. The system is the story.",
};

for (const [id, snippet] of Object.entries(requiredSnippets)) {
  if (!copyFile.includes(snippet)) {
    failed = true;
    console.error(`MISSING ${id}: expected “${snippet}” in src/lib/copy.ts`);
  }
}

for (const file of files) {
  const text = await readFile(file, "utf8");
  const rel = path.relative(ROOT, file);

  for (const rule of BANNED) {
    if (rel === "content/lp-copy-v1.md" && /C04|C05|C06|C08/.test(text) && rule.id !== "C08") {
      // Register language in the claims table / gate is documentation, not public LP.
    }
    if (rel.startsWith("content/") && rule.id !== "C08") continue;
    if (rel === "content/lp-copy-v1.md" && rule.id === "C08") {
      if (/Alan Thicke|Robin Thicke/.test(text)) {
        failed = true;
        console.error(`${rel}: ${rule.id} ${rule.note}`);
      }
      continue;
    }
    if (rule.re.test(text)) {
      failed = true;
      console.error(`${rel}: ${rule.id} ${rule.note}`);
    }
  }

  const matches = text.match(/https?:\/\/simplicitymedia\.com[^"'\s)]*/g) || [];
  for (const url of matches) {
    const clean = url.replace(/[.,]$/, "");
    if (clean !== ALLOWED_MAIN_SITE && !clean.startsWith(`${ALLOWED_MAIN_SITE}`)) {
      failed = true;
      console.error(`${rel}: main-site URL is not the Optima case study: ${clean}`);
    }
  }
}

if (!failed) {
  console.log(`Claim audit clean. Required ${required.join(", ")} present. Banned C04/C05/C06/C08 absent from public source.`);
  process.exit(0);
}

process.exit(1);
