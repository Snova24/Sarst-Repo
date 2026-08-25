import { describe, expect, it } from "vitest";
import { TIDEGLASS } from "../data/intel";
import { MEMBERSHIPS } from "../data/memberships";
import { getCoupon } from "./coupons";
import { milesBetween } from "./geo";
import { liveClubCoupons, lookupScan, nearbyReminders, NEAR_MILES } from "./club";

const NOW = new Date("2026-08-25T12:00:00");

describe("membership catalog", () => {
  it("points every club perk at a live coupon", () => {
    for (const club of MEMBERSHIPS) {
      expect(club.couponIds.length).toBeGreaterThan(0);
      for (const id of club.couponIds) {
        expect(getCoupon(id), id).toBeDefined();
      }
      expect(liveClubCoupons(club, NOW).length).toBeGreaterThan(0);
    }
  });
});

describe("nearbyReminders", () => {
  it("stays quiet with no pin or no clubs", () => {
    expect(nearbyReminders(["club-harbor-pantry"], null, NOW)).toEqual([]);
    expect(nearbyReminders([], TIDEGLASS, NOW)).toEqual([]);
  });

  it("nags Harbor Pantry Club when the Tideglass pin is set", () => {
    const harbor = MEMBERSHIPS.find((club) => club.id === "club-harbor-pantry");
    expect(harbor).toBeDefined();
    const miles = milesBetween(TIDEGLASS, harbor!.place);
    expect(miles).toBeGreaterThan(0);
    expect(miles).toBeLessThanOrEqual(NEAR_MILES);

    const rows = nearbyReminders(["club-harbor-pantry"], TIDEGLASS, NOW);
    expect(rows).toHaveLength(1);
    expect(rows[0].club.id).toBe("club-harbor-pantry");
    expect(rows[0].miles).toBeLessThanOrEqual(NEAR_MILES);
    expect(rows[0].coupons.some((coupon) => coupon.code === "HARBOR10")).toBe(true);
  });

  it("ignores a club that is oceans away", () => {
    expect(nearbyReminders(["club-harbor-pantry"], { lat: 0, lng: 0 }, NOW)).toEqual([]);
  });
});

describe("lookupScan", () => {
  it("matches a coupon code with or without Code 39 guards", () => {
    expect(lookupScan("HARBOR10")).toEqual({ kind: "coupon", id: "harbor-pantry-10" });
    expect(lookupScan("*HARBOR10*")).toEqual({ kind: "coupon", id: "harbor-pantry-10" });
  });

  it("matches a membership number", () => {
    expect(lookupScan("HP-482910")).toEqual({ kind: "club", id: "club-harbor-pantry" });
    expect(lookupScan("hp-482910")).toEqual({ kind: "club", id: "club-harbor-pantry" });
  });

  it("returns null for unknown ink", () => {
    expect(lookupScan("NOPE")).toBeNull();
    expect(lookupScan("")).toBeNull();
  });
});
