#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
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

await mkdir(destDir, { recursive: true });

for (const name of stills) {
  const dest = path.join(destDir, name);
  if (existsSync(dest)) continue;
  const encoded = path.join(encodedDir, `${name}.b64`);
  if (!existsSync(encoded)) {
    console.error(`Missing encoded still: ${path.relative(root, encoded)}`);
    process.exit(1);
  }
  const body = Buffer.from(await readFile(encoded, "utf8"), "base64");
  await writeFile(dest, body);
  console.log(`Wrote ${path.relative(root, dest)} (${body.length} bytes)`);
}
