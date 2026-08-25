import { describe, expect, it } from "vitest";
import { getCoupon } from "./coupons";
import { milesBetween } from "./geo";
import { analyzeDeal, feeDrag, intelFor, median, priceLegitimacy } from "./intel";

describe("geo math", () => {
  it("returns zero miles for the same pin", () => {
    expect(milesBetween({ lat: 45.515, lng: -122.678 }, { lat: 45.515, lng: -122.678 })).toBe(0);
  });

  it("measures a short Tideglass hop as under two miles", () => {
    const miles = milesBetween({ lat: 45.515, lng: -122.678 }, { lat: 45.523, lng: -122.674 });
    expect(miles).toBeGreaterThan(0.4);
    expect(miles).toBeLessThan(2);
  });
});

describe("price archive", () => {
  it("flags Sable & Oak 30% as an inflated was-price versus archived web", () => {
    const coupon = getCoupon("sable-oak-30");
    expect(coupon).toBeDefined();
    const report = analyzeDeal(coupon!);
    expect(report.priceLegit).toBe("inflated");
    expect(report.verdict).toBe("skip");
    expect(report.trueDiscountPct).not.toBeNull();
    expect(report.trueDiscountPct!).toBeLessThan(12);
  });

  it("flags Gilded Stem BOGO as an always-on promo", () => {
    const coupon = getCoupon("gilded-stem-bogo");
    const { legit } = priceLegitimacy(intelFor(coupon!));
    expect(legit).toBe("always-on");
    expect(analyzeDeal(coupon!).verdict).toBe("skip");
  });

  it("treats Pixel Harbor $40 off as a real cut versus archive", () => {
    const coupon = getCoupon("pixel-harbor-40");
    const report = analyzeDeal(coupon!);
    expect(report.priceLegit).toBe("legit");
    expect(report.verdict).toBe("worth");
  });
});

describe("fee math", () => {
  it("subtracts Harbor Mutual monthly fees from the $300 headline", () => {
    const coupon = getCoupon("harbor-mutual-300");
    expect(coupon).toBeDefined();
    const fees = feeDrag(coupon!, intelFor(coupon!));
    expect(fees).toBe(72);
    const report = analyzeDeal(coupon!);
    expect(report.claimed).toBe(300);
    expect(report.net).toBe(228);
    expect(report.verdict).toBe("worth");
  });

  it("counts Fernwick origination percent as drag on a 0% loan", () => {
    const coupon = getCoupon("fernwick-loan-0");
    const report = analyzeDeal(coupon!);
    expect(report.fees).toBeGreaterThan(100);
    expect(report.net).toBeLessThan(report.claimed);
    expect(report.simpleTerms.length).toBeGreaterThan(0);
  });
});

describe("median", () => {
  it("averages the middle pair on even lists", () => {
    expect(median([1, 3, 2, 4])).toBe(2.5);
    expect(median([9])).toBe(9);
    expect(median([])).toBeNull();
  });
});
