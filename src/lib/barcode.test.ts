import { describe, expect, it } from "vitest";
import { code39Bars, lookupCode, toCode39Payload } from "./barcode";

describe("Code 39", () => {
  it("wraps a member number in start and stop asterisks", () => {
    expect(toCode39Payload("HP-482910")).toBe("*HP-482910*");
  });

  it("emits bars for a register scan", () => {
    const units = code39Bars("HP-482910");
    expect(units.length).toBeGreaterThan(20);
    expect(units.some((unit) => unit.bar)).toBe(true);
    expect(units.some((unit) => unit.wide)).toBe(true);
  });

  it("finds a code inside a scanner payload", () => {
    expect(lookupCode("*HARBOR10*", ["HARBOR10", "HP-482910"])).toBe("HARBOR10");
    expect(lookupCode("HP-482910", ["HARBOR10", "HP-482910"])).toBe("HP-482910");
  });
});
