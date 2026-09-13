#!/usr/bin/env node
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const encodedDir = path.join(root, "content/production-stills");
const destDir = path.join(root, "public/images/production");

const stills = [
  "camera-operator.webp",
  "courtyard-dolly.webp",
  "hillside-sunset.webp",
  "night-lighting.webp",
  "process-trailer.webp",
];

async function encodedPayload(name) {
  const whole = path.join(encodedDir, `${name}.b64`);
  if (existsSync(whole)) {
    return (await readFile(whole, "utf8")).replace(/\s+/g, "");
  }

  const prefix = `${name}.b64.part`;
  const names = existsSync(encodedDir)
    ? (await readdir(encodedDir)).filter((file) => file.startsWith(prefix))
    : [];
  names.sort();
  if (names.length === 0) return null;

  const chunks = [];
  for (const file of names) {
    chunks.push(await readFile(path.join(encodedDir, file), "utf8"));
  }
  return chunks.join("").replace(/\s+/g, "");
}

await mkdir(destDir, { recursive: true });

for (const name of stills) {
  const dest = path.join(destDir, name);
  if (existsSync(dest)) continue;
  const encoded = await encodedPayload(name);
  if (!encoded) {
    console.warn(`Skipping missing still: ${name}`);
    continue;
  }
  const body = Buffer.from(encoded, "base64");
  await writeFile(dest, body);
  console.log(`Wrote ${path.relative(root, dest)} (${body.length} bytes)`);
}
