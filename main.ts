// Describe Your Ex in One Word — make.fun bounty entry.
//
// Writes a single original word describing an ex (generic, playful —
// no real person) to /output/entry.txt, exactly as the competition's
// gate requires: UTF-8 text, 1 to 111 characters, not only whitespace,
// one word.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Candidates judged against the judge's brief (verdict on an ex first,
// then comic punch, surprise, craft, recognition):
//   Ghostwriter — ghosted + wrote the ending; clever, but reads as a
//     profession first, so it is weaker as an instant verdict.
//   Unsubscribe — punchy, but already entered by another entrant.
//   Refurbished — already entered by another entrant.
//   Refund — "give me my time back"; punchy and instantly a verdict,
//     but a plain demand, less surprise.
//   Freemium — the free tier: all the ads, none of the features;
//     surprising, but needs a beat to land.
//   Overdraft — took more than they gave; money metaphor, decent.
//   Trial — the relationship was a trial period that expired; neat
//     but soft.
//   Beta — an unfinished version; too vague.
//   Draft — never finished or sent; weak.
//   Ghosted — the obvious choice, likely the most common word.
//   Buffering — never loaded; cute, weak as a verdict.
//   Recalled — like a product recall; decent, less funny.
//   Downgrade — the ex was a downgrade; funny, needs context.
//   Voicemail — old and unanswered; weak.
// Winner: "Uninstalled" — removed from my life the way you remove an
// app: one tap, no goodbye, storage freed. Instantly readable as a
// verdict on an ex, a precise absurdity rather than a plain insult,
// surprising, exactly one correctly-spelled word with no punctuation
// tricks, and anyone who has ever uninstalled something nods at it.
const WORD = "Uninstalled";

function main(): void {
  // Enforce the competition's gate locally: 1 to 111 characters.
  if (!(WORD.length >= 1 && WORD.length <= 111)) {
    throw new Error(`word is ${WORD.length} chars, gate needs 1-111`);
  }
  if (!WORD.trim()) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(WORD)) {
    throw new Error("entry must be a single word");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, WORD, "utf8");
  // Read it back: the file the judge sees must be exactly the word.
  const roundTrip = readFileSync(`${outDir}/entry.txt`, "utf8");
  if (roundTrip !== WORD) {
    throw new Error(`round-trip mismatch: ${JSON.stringify(roundTrip)}`);
  }
  // 11 characters: one word, inside the 1–111 gate.
  console.log(`wrote ${WORD.length} chars to ${outDir}/entry.txt`);
}

main();
