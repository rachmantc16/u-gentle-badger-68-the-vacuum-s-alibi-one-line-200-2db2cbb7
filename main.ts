// The Vacuum's Alibi — a make.fun program/v1 entry.
//
// A robot vacuum is brought in for questioning about the one spot it
// missed, and it answers the way any well-lawyered suspect would: with
// a timestamped alibi. This program writes that single line of testimony
// to entry.txt in the harness output directory, and nothing else.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The testimony. One line, first person, machine voice under
// interrogation: it opens by addressing the officer, cites its
// timestamped logs, pleads its charging schedule, declares the dusty
// spot outside its jurisdiction, and closes on the one household
// appliance that cannot be called to contradict it.
const ALIBI =
  "Officer, my logs are timestamped: at 21:47 I was docked, charging, precisely on schedule. The dust under the piano is outside my jurisdiction. That territory was ceded to the broom in 2019.";

// The grader mounts the output directory at /output, and may also name
// it through MAKEFUN_OUTPUT_DIR; honour the variable when it is set.
function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

// The gate only forwards UTF-8 text of 1 to 200 characters that is not
// blank. Hold the alibi to that gate here, so a careless edit fails
// loudly at build time instead of producing an entry that scores 0.
function checkAlibi(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("the alibi is blank");
  }
  if (line.length > 200) {
    throw new Error(`the alibi is ${line.length} characters; the limit is 200`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("the alibi must fit on one line");
  }
}

function main(): void {
  checkAlibi(ALIBI);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), ALIBI, "utf8");
  console.log(`entry.txt written (${ALIBI.length} characters)`);
}

main();
