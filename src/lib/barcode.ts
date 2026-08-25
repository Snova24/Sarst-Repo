/** Code 39 (restricted ASCII). Suitable for register scanners. */
const PATTERNS: Record<string, string> = {
  "0": "nnnwwnwnn",
  "1": "wnnwnnnnw",
  "2": "nnwwnnnnw",
  "3": "wnwwnnnnn",
  "4": "nnnwwnnnw",
  "5": "wnnwwnnnn",
  "6": "nnwwwnnnn",
  "7": "nnnwnnwnw",
  "8": "wnnwnnwnn",
  "9": "nnwwnnwnn",
  A: "wnnnnwnnw",
  B: "nnwnnwnnw",
  C: "wnwnnwnnn",
  D: "nnnnwwnnw",
  E: "wnnnwwnnn",
  F: "nnwnwwnnn",
  G: "nnnnnwwnw",
  H: "wnnnnwwnn",
  I: "nnwnnwwnn",
  J: "nnnnwwwnn",
  K: "wnnnnnnww",
  L: "nnwnnnnww",
  M: "wnwnnnnwn",
  N: "nnnnwnnww",
  O: "wnnnwnnwn",
  P: "nnwnwnnwn",
  Q: "nnnnnnwww",
  R: "wnnnnnwwn",
  S: "nnwnnnwwn",
  T: "nnnnwnwwn",
  U: "wwnnnnnnw",
  V: "nwwnnnnnw",
  W: "wwwnnnnnn",
  X: "nwnnwnnnw",
  Y: "wwnnwnnnn",
  Z: "nwwnwnnnn",
  "-": "nwnnnnwnw",
  ".": "wwnnnnwnn",
  " ": "nwwnnnwnn",
  $: "nwnwnwnnn",
  "/": "nwnwnnnwn",
  "+": "nwnnnwnwn",
  "%": "nnnwnwnwn",
  "*": "nwnnwnwnn",
};

export function toCode39Payload(raw: string): string {
  const cleaned = raw.toUpperCase().replace(/[^0-9A-Z. +\-\/$%]/g, "");
  return `*${cleaned || "CLIP"}*`;
}

export function code39Bars(raw: string): { wide: boolean; bar: boolean }[] {
  const payload = toCode39Payload(raw);
  const units: { wide: boolean; bar: boolean }[] = [];
  for (let i = 0; i < payload.length; i += 1) {
    const pattern = PATTERNS[payload[i]] ?? PATTERNS["-"];
    for (let j = 0; j < pattern.length; j += 1) {
      units.push({ wide: pattern[j] === "w", bar: j % 2 === 0 });
    }
    if (i < payload.length - 1) units.push({ wide: false, bar: false });
  }
  return units;
}

export function lookupCode(haystack: string, codes: string[]): string | null {
  const q = haystack.trim().toUpperCase().replace(/^\*/, "").replace(/\*$/, "");
  const exact = codes.find((code) => code.toUpperCase() === q);
  if (exact) return exact;
  return codes.find((code) => q.includes(code.toUpperCase())) ?? null;
}
