import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";

const ENTRY =
  "This meeting could have been an email, so I sent the email — and now we're all here reading it out loud together.";
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// Fail fast on the competition gate: 1–200 UTF-8 characters, one line,
// not only white space.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} chars, gate requires 1–200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync(OUT_DIR, { recursive: true });
for (const name of readdirSync(OUT_DIR)) {
  rmSync(`${OUT_DIR}/${name}`, { recursive: true, force: true });
}
writeFileSync(OUT_FILE, ENTRY, "utf8");

// Post-write read-back: the file on disk must be byte-identical to ENTRY.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
