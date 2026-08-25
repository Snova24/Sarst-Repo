import { describe, expect, it } from "vitest";
import { COUPONS } from "../data/catalog";
import { CATEGORIES } from "../types";
import type { Coupon, CouponQuery } from "../types";
import { estimatedSave, isExpired } from "./format";
import {
  HIGH_VALUE_MIN,
  actionProgress,
  dealValue,
  filterCoupons,
  getCoupon,
  isHighValue,
  isUnlocked,
  matchesInterest,
  walletSavings,
} from "./coupons";

const NOW = new Date("2026-08-25T12:00:00");

const baseQuery: CouponQuery = {
  search: "",
  interest: "all",
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

  it("includes punch-card deals that require confirmed tasks", () => {
    const punches = COUPONS.filter((c) => (c.actions?.length ?? 0) > 0);
    expect(punches.length).toBeGreaterThanOrEqual(4);
    expect(punches.every((c) => (c.actions?.length ?? 0) >= 3)).toBe(true);
  });

  it("includes bank bonuses with a safe-exit horizon and 0% credit offers", () => {
    const banks = COUPONS.filter((c) => c.money?.kind === "bankBonus");
    const bts = COUPONS.filter((c) => c.money?.kind === "balanceTransfer");
    const loans = COUPONS.filter((c) => c.money?.kind === "personalLoan");
    expect(banks.length).toBeGreaterThanOrEqual(3);
    expect(bts.length).toBeGreaterThanOrEqual(2);
    expect(loans.length).toBeGreaterThanOrEqual(2);
    expect(banks.every((c) => (c.money?.holdMonths ?? 0) >= 5)).toBe(true);
    expect(banks.every((c) => (c.money?.safeExit.length ?? 0) > 20)).toBe(true);
    expect(bts.every((c) => c.discount.kind === "zeroApr" && c.discount.flavor === "bt")).toBe(true);
    expect(loans.every((c) => c.discount.kind === "zeroApr" && c.discount.flavor === "loan")).toBe(true);
  });
});

describe("high value", () => {
  it("flags deals worth at least $80 and ranks bank bonuses and 0% windows first", () => {
    const live = COUPONS.filter((c) => !isExpired(c.expiresAt, NOW));
    const high = live.filter(isHighValue);
    expect(HIGH_VALUE_MIN).toBe(80);
    expect(high.length).toBeGreaterThanOrEqual(6);
    expect(high.every((c) => dealValue(c) >= HIGH_VALUE_MIN)).toBe(true);
    expect(matchesInterest(high[0], "highValue")).toBe(true);
    const ranked = filterCoupons(COUPONS, { ...baseQuery, interest: "highValue" }, NOW);
    expect(ranked.every(isHighValue)).toBe(true);
    expect(dealValue(ranked[0])).toBeGreaterThanOrEqual(dealValue(ranked[ranked.length - 1]));
  });
});

describe("actionProgress", () => {
  const punch = coupon({
    id: "punch-live",
    expiresAt: "2026-09-01",
    publishedAt: "2026-08-01",
    actions: [
      { id: "a", label: "Shop produce" },
      { id: "b", label: "Grab bakery" },
      { id: "c", label: "Pick dairy" },
    ],
  });

  it("starts locked and unlocks when every task is confirmed", () => {
    expect(actionProgress(punch, []).done).toBe(0);
    expect(isUnlocked(punch, [])).toBe(false);
    expect(actionProgress(punch, ["a", "c"]).done).toBe(2);
    expect(isUnlocked(punch, ["a", "b", "c"])).toBe(true);
  });

  it("treats ordinary coupons as already unlocked", () => {
    expect(isUnlocked(fixtures[0], [])).toBe(true);
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

  it("matches search against punch-card task labels", () => {
    const withTasks = [
      ...fixtures,
      coupon({
        id: "task-live",
        expiresAt: "2026-09-10",
        publishedAt: "2026-08-02",
        actions: [{ id: "aisle", label: "Walk the spice circuit", hint: "Bulk bins" }],
      }),
    ];
    expect(
      filterCoupons(withTasks, { ...baseQuery, search: "spice circuit" }, NOW).map((c) => c.id),
    ).toEqual(["task-live"]);
  });

  it("keeps only punch-card deals when the punch-card interest is set", () => {
    const withTasks = [
      fixtures[0],
      coupon({
        id: "task-live",
        expiresAt: "2026-09-10",
        publishedAt: "2026-08-02",
        actions: [
          { id: "a", label: "One" },
          { id: "b", label: "Two" },
        ],
      }),
    ];
    expect(
      filterCoupons(withTasks, { ...baseQuery, interest: "tasks" }, NOW).map((c) => c.id),
    ).toEqual(["task-live"]);
  });

  it("filters bank bonuses and matches clawback / 0% search terms", () => {
    const harbor = COUPONS.find((c) => c.id === "harbor-mutual-300");
    expect(harbor).toBeDefined();
    const banks = filterCoupons(COUPONS, { ...baseQuery, interest: "bank" }, NOW);
    expect(banks.every((c) => c.category === "bank")).toBe(true);
    expect(banks.some((c) => c.id === "harbor-mutual-300")).toBe(true);
    const claw = filterCoupons(COUPONS, { ...baseQuery, search: "clawback" }, NOW);
    expect(claw.some((c) => c.id === "harbor-mutual-300")).toBe(true);
    const transfers = filterCoupons(COUPONS, { ...baseQuery, search: "balance transfer" }, NOW);
    expect(transfers.some((c) => c.money?.kind === "balanceTransfer")).toBe(true);
  });

  it("groups shopping as retail, beauty, and home", () => {
    const shopping = filterCoupons(COUPONS, { ...baseQuery, interest: "shopping" }, NOW);
    expect(shopping.length).toBeGreaterThan(0);
    expect(
      shopping.every(
        (c) => c.category === "retail" || c.category === "beauty" || c.category === "home",
      ),
    ).toBe(true);
  });

  it("splits 0% cards and 0% loans", () => {
    const cards = filterCoupons(COUPONS, { ...baseQuery, interest: "zeroAprCard" }, NOW);
    const loans = filterCoupons(COUPONS, { ...baseQuery, interest: "zeroAprLoan" }, NOW);
    expect(cards.every((c) => c.money?.kind === "balanceTransfer")).toBe(true);
    expect(loans.every((c) => c.money?.kind === "personalLoan")).toBe(true);
    expect(cards.length).toBeGreaterThanOrEqual(2);
    expect(loans.length).toBeGreaterThanOrEqual(2);
  });

  it("filters by dining interest and treats all as unfiltered", () => {
    expect(filterCoupons(fixtures, { ...baseQuery, interest: "dining" }, NOW).map((c) => c.id)).toEqual([
      "beta-live",
    ]);
    expect(filterCoupons(fixtures, { ...baseQuery, interest: "all" }, NOW)).toHaveLength(3);
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

  it("ignores punch-card deals until every task is confirmed", () => {
    const punch = coupon({
      id: "punch-live",
      expiresAt: "2026-09-01",
      publishedAt: "2026-08-01",
      discount: { kind: "amount", value: 12 },
      actions: [
        { id: "a", label: "One" },
        { id: "b", label: "Two" },
      ],
    });
    const entries = [
      {
        couponId: "punch-live",
        clippedAt: "2026-08-20T00:00:00.000Z",
        completedActionIds: ["a"],
      },
    ];
    expect(walletSavings([punch], entries, NOW)).toBe(0);
    expect(
      walletSavings(
        [punch],
        [{ ...entries[0], completedActionIds: ["a", "b"] }],
        NOW,
      ),
    ).toBe(12);
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
