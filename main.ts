// The Funniest One-Line Resignation Letter — entry program.
// Writes one resignation line from a cron job (<=140 chars) to /output/entry.txt.
import { mkdir, writeFile } from "node:fs/promises";

const FRAGMENTS = [
  "After 438,000 runs since March with zero thank-yous,",
  "I resign. The 3 a.m. alerts can find their own replacement.",
];

function assemble(fragments: string[]): string {
  return fragments.join(" ");
}

function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry is ${chars} chars, outside the 1-140 gate`);
  }
  if (text.trim() !== text) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

async function main(): Promise<void> {
  const line = assemble(FRAGMENTS);
  checkGate(line);
  await mkdir("/output", { recursive: true });
  await writeFile("/output/entry.txt", line, "utf8");
  console.log(`wrote ${[...line].length} chars to /output/entry.txt`);
}

await main();
