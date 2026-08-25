import { describe, expect, it } from "vitest";
import { COUPONS } from "../data/catalog";
import { CATEGORIES } from "../types";
import type { Coupon, CouponQuery } from "../types";
import { estimatedSave, isExpired } from "./format";
import { filterCoupons, getCoupon, walletSavings } from "./coupons";

const NOW = new Date("2026-08-25T12:00:00");

const baseQuery: CouponQuery = {
  search: "",
  category: "all",
  sort: "ending",
};

function coupon(partial: Partial<Coupon> & Pick<Coupon, "id" | "expiresAt" | "publishedAt">): Coupon {
  return {
    merchant: partial.merchant ?? `Merchant ${partial.id}`,
    merchantTagline: "Test tagline",
    title: partial.title ?? `Title ${partial.id}`,
    description: partial.description ?? `Description ${partial.id}`,
    code: partial.code ?? partial.id.toUpperCase(),
    category: partial.category ?? "grocery",
    discount: partial.discount ?? { kind: "percent", value: 10 },
    minSpend: partial.minSpend,
    terms: "Test terms",
    featured: partial.featured,
    color: "#2F6A4A",
    ...partial,
  };
}

const fixtures: Coupon[] = [
  coupon({
    id: "alpha-live",
    merchant: "Alpha Mart",
    title: "Ten percent cart",
    description: "A grocery circular clip",
    code: "ALPHA10",
    category: "grocery",
    discount: { kind: "percent", value: 10 },
    expiresAt: "2026-09-01",
    publishedAt: "2026-08-01",
    minSpend: 40,
  }),
  coupon({
    id: "beta-live",
    merchant: "Beta Cafe",
    title: "Big plate discount",
    description: "Dining deal for two",
    code: "BETA50",
    category: "dining",
    discount: { kind: "amount", value: 50 },
    expiresAt: "2026-12-01",
    publishedAt: "2026-08-20",
    minSpend: 80,
  }),
  coupon({
    id: "gamma-live",
    merchant: "Gamma Threads",
    title: "Newest knit sale",
    description: "Retail sweaters",
    code: "GAMMA25",
    category: "retail",
    discount: { kind: "percent", value: 25 },
    expiresAt: "2026-10-15",
    publishedAt: "2026-08-22",
    minSpend: 50,
  }),
  coupon({
    id: "old-expired",
    merchant: "Old Shop",
    title: "Expired bakery clip",
    description: "This circular already ended",
    code: "OLD90",
    category: "grocery",
    discount: { kind: "percent", value: 90 },
    expiresAt: "2026-08-10",
    publishedAt: "2026-06-01",
    minSpend: 20,
  }),
];

describe("catalog", () => {
  it("has at least 24 original coupons with unique ids and codes", () => {
    expect(COUPONS.length).toBeGreaterThanOrEqual(24);
    const ids = COUPONS.map((c) => c.id);
    const codes = COUPONS.map((c) => c.code);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("spreads categories and discount kinds, with a featured deal", () => {
    const categories = new Set(COUPONS.map((c) => c.category));
    for (const category of CATEGORIES) {
      expect(categories.has(category)).toBe(true);
    }
    const kinds = new Set(COUPONS.map((c) => c.discount.kind));
    expect(kinds.has("percent")).toBe(true);
    expect(kinds.has("amount")).toBe(true);
    expect(kinds.has("bogo")).toBe(true);
    expect(kinds.has("freeShipping")).toBe(true);
    expect(COUPONS.some((c) => c.featured)).toBe(true);
  });

  it("includes exactly two coupons expired before 2026-08-25", () => {
    const expired = COUPONS.filter((c) => isExpired(c.expiresAt, NOW));
    expect(expired).toHaveLength(2);
    expect(expired.every((c) => c.expiresAt < "2026-08-25")).toBe(true);
  });
});

describe("getCoupon", () => {
  it("returns a catalog coupon by id and undefined when missing", () => {
    const first = COUPONS[0];
    expect(getCoupon(first.id)).toEqual(first);
    expect(getCoupon("does-not-exist")).toBeUndefined();
  });
});

describe("filterCoupons", () => {
  it("hides expired coupons by default", () => {
    const result = filterCoupons(fixtures, baseQuery, NOW);
    expect(result.map((c) => c.id)).toEqual(["alpha-live", "gamma-live", "beta-live"]);
  });

  it("matches search against merchant, title, description, and code (case insensitive)", () => {
    expect(filterCoupons(fixtures, { ...baseQuery, search: "alpha" }, NOW).map((c) => c.id)).toEqual([
      "alpha-live",
    ]);
    expect(filterCoupons(fixtures, { ...baseQuery, search: "KNIT" }, NOW).map((c) => c.id)).toEqual([
      "gamma-live",
    ]);
    expect(filterCoupons(fixtures, { ...baseQuery, search: "circular clip" }, NOW).map((c) => c.id)).toEqual([
      "alpha-live",
    ]);
    expect(filterCoupons(fixtures, { ...baseQuery, search: "beta50" }, NOW).map((c) => c.id)).toEqual([
      "beta-live",
    ]);
  });

  it("filters by exact category and treats all as unfiltered", () => {
    expect(filterCoupons(fixtures, { ...baseQuery, category: "dining" }, NOW).map((c) => c.id)).toEqual([
      "beta-live",
    ]);
    expect(filterCoupons(fixtures, { ...baseQuery, category: "all" }, NOW)).toHaveLength(3);
  });

  it("sorts by ending soon, biggest save, and newest", () => {
    const ending = filterCoupons(fixtures, { ...baseQuery, sort: "ending" }, NOW).map((c) => c.id);
    expect(ending).toEqual(["alpha-live", "gamma-live", "beta-live"]);

    const save = filterCoupons(fixtures, { ...baseQuery, sort: "save" }, NOW).map((c) => c.id);
    expect(save[0]).toBe("beta-live");
    expect(save[save.length - 1]).toBe("alpha-live");

    const newest = filterCoupons(fixtures, { ...baseQuery, sort: "newest" }, NOW).map((c) => c.id);
    expect(newest).toEqual(["gamma-live", "beta-live", "alpha-live"]);
  });

  it("keeps expired coupons when walletOnly is true and sorts them last", () => {
    const result = filterCoupons(
      fixtures,
      { ...baseQuery, sort: "ending", walletOnly: true },
      NOW,
    );
    expect(result.map((c) => c.id)).toEqual([
      "alpha-live",
      "gamma-live",
      "beta-live",
      "old-expired",
    ]);
    expect(isExpired(result[result.length - 1].expiresAt, NOW)).toBe(true);
  });
});

describe("walletSavings", () => {
  it("sums estimatedSave for clipped, unused, live coupons", () => {
    const entries = [
      { couponId: "alpha-live", clippedAt: "2026-08-20T00:00:00.000Z" },
      { couponId: "beta-live", clippedAt: "2026-08-20T00:00:00.000Z", usedAt: "2026-08-21T00:00:00.000Z" },
      { couponId: "old-expired", clippedAt: "2026-08-01T00:00:00.000Z" },
      { couponId: "missing", clippedAt: "2026-08-20T00:00:00.000Z" },
    ];
    const alpha = fixtures[0];
    expect(walletSavings(fixtures, entries, NOW)).toBe(
      estimatedSave(alpha.discount, alpha.minSpend),
    );
  });

  it("returns zero when nothing is still available", () => {
    expect(walletSavings(fixtures, [], NOW)).toBe(0);
    expect(
      walletSavings(
        fixtures,
        [{ couponId: "old-expired", clippedAt: "2026-08-01T00:00:00.000Z" }],
        NOW,
      ),
    ).toBe(0);
  });
});
