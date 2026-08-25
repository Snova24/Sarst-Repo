import type { DealIntel, GeoPlace, PriceSnapshot } from "../types";

export const TIDEGLASS: GeoPlace = {
  label: "Tideglass market district",
  lat: 45.515,
  lng: -122.678,
  online: false,
};

function pin(label: string, dLat: number, dLng: number, online = false): GeoPlace {
  return {
    label,
    lat: TIDEGLASS.lat + dLat,
    lng: TIDEGLASS.lng + dLng,
    online,
  };
}

function archive(
  rows: [string, number, PriceSnapshot["source"], string?][],
): PriceSnapshot[] {
  return rows.map(([at, price, source, note]) => ({ at, price, source, note }));
}

/** Hand-checked price files (shelf + archived web). Live Wayback is a later pipe. */
export const DEAL_INTEL: Record<string, DealIntel> = {
  "harbor-pantry-10": {
    advertisedWas: 48,
    advertisedNow: 43.2,
    typicalPrice: 48,
    hassleHours: 0.3,
    monthlyFee: 0,
    simpleTerms: [
      "10% off a normal grocery cart.",
      "Not on alcohol, pharmacy, or gift cards.",
      "One clip per visit, store or site.",
    ],
    place: pin("Harbor Pantry · Tideglass", 0.008, -0.004),
    archive: archive([
      ["2026-02-01", 47.5, "shelf", "Tuesday circular, no extra markdown"],
      ["2026-04-12", 48.2, "web"],
      ["2026-07-01", 48.0, "archive", "Same basket on the merchant page"],
      ["2026-08-20", 43.2, "shelf", "With HARBOR10"],
    ]),
  },
  "sable-oak-30": {
    advertisedWas: 120,
    advertisedNow: 84,
    typicalPrice: 88,
    hassleHours: 0.5,
    simpleTerms: [
      "They say 30% off $120 shirts.",
      "Archived web price was already about $88.",
      "True cut is small. Tailoring is extra.",
    ],
    place: pin("Sable & Oak · Clothiers row", 0.004, 0.006),
    archive: archive([
      ["2026-01-15", 89, "web", "Everyday web price"],
      ["2026-03-02", 88, "archive", "Wayback-style capture of the product page"],
      ["2026-06-18", 86, "web"],
      ["2026-08-20", 84, "shelf", "With SABLE30 — almost the usual price"],
    ]),
  },
  "gilded-stem-bogo": {
    advertisedWas: 11,
    advertisedNow: 11,
    typicalPrice: 18,
    hassleHours: 0.4,
    simpleTerms: [
      "BOGO looks like 50% off.",
      "This tint has been BOGO on the site for months.",
      "Not a new cut — an always-on promo.",
    ],
    place: pin("Gilded Stem · Beauty lane", -0.003, 0.005),
    archive: archive([
      ["2026-01-08", 11, "web", "BOGO already running"],
      ["2026-04-01", 11, "archive"],
      ["2026-07-20", 11, "web", "Still BOGO"],
      ["2026-08-11", 11, "shelf"],
    ]),
  },
  "pixel-harbor-40": {
    advertisedWas: 219,
    advertisedNow: 179,
    typicalPrice: 219,
    hassleHours: 0.7,
    simpleTerms: [
      "$40 off a refurbished display that really sat near $219.",
      "Pickup in Tideglass. Ninety-day warranty stays.",
    ],
    place: pin("Pixel Harbor · Service alley", 0.01, -0.008),
    archive: archive([
      ["2026-03-01", 229, "web"],
      ["2026-05-14", 219, "archive", "Street price before the circular"],
      ["2026-07-01", 219, "shelf"],
      ["2026-08-01", 179, "shelf", "With PIXEL40"],
    ]),
  },
  "willow-table-20": {
    advertisedWas: 75,
    advertisedNow: 60,
    typicalPrice: 75,
    hassleHours: 0.2,
    simpleTerms: [
      "20% off dinner for two after 5pm.",
      "Tip on the pre-discount total. No alcohol.",
    ],
    place: pin("Willow Table", -0.006, -0.002),
    archive: archive([
      ["2026-02-10", 74, "web", "Two-entree average"],
      ["2026-06-01", 76, "archive"],
      ["2026-08-01", 60, "shelf", "With WILLOW20"],
    ]),
  },
  "harbor-mutual-300": {
    typicalPrice: 300,
    hassleHours: 4,
    monthlyFee: 12,
    simpleTerms: [
      "$300 after two payroll deposits.",
      "Minus about $12 a month if you do not waive the fee.",
      "Do not close until month 6 or they can take it back.",
    ],
    place: { label: "Harbor Mutual · online + branch", lat: 45.52, lng: -122.67, online: true },
    archive: archive([
      ["2026-01-01", 300, "web", "Headline bonus unchanged"],
      ["2026-06-01", 300, "archive"],
    ]),
  },
  "driftwood-cu-400": {
    typicalPrice: 400,
    hassleHours: 5,
    monthlyFee: 0,
    simpleTerms: [
      "$400 if $2,000 of real payroll lands in 90 days.",
      "180-day clawback. Zelle does not count as direct deposit.",
    ],
    place: pin("Driftwood Credit Union", 0.012, 0.01),
    archive: archive([["2026-05-01", 400, "web", "Bonus ad"]]),
  },
  "sable-ledger-bt": {
    typicalPrice: 5000,
    hassleHours: 2,
    percentFee: 3,
    annualFee: 0,
    simpleTerms: [
      "0% for 18 months on a transfer.",
      "3% fee is interest you pay on day one.",
      "Pay to $0 before month 18 or it jumps to ~25%.",
    ],
    place: { label: "Sable Ledger · online", lat: TIDEGLASS.lat, lng: TIDEGLASS.lng, online: true },
    archive: archive([["2026-08-01", 24.99, "web", "Then-APR, not a product price"]]),
  },
  "paper-moon-bt": {
    typicalPrice: 8000,
    hassleHours: 2.5,
    percentFee: 4,
    annualFee: 150,
    simpleTerms: [
      "Longest 0% window here (21 months).",
      "4% transfer fee plus $150 annual fee.",
      "Only worth it on a large balance you will actually kill.",
    ],
    place: { label: "Paper Moon Card · online", lat: TIDEGLASS.lat, lng: TIDEGLASS.lng, online: true },
    archive: archive([]),
  },
  "fernwick-loan-0": {
    typicalPrice: 5000,
    hassleHours: 1.5,
    percentFee: 3.9,
    simpleTerms: [
      "Headline is 0%. You never receive 3.9% of the loan.",
      "That origination fee is the interest.",
      "Pay to $0 by month 11. No prepay penalty.",
    ],
    place: { label: "Fernwick Personal · online", lat: TIDEGLASS.lat, lng: TIDEGLASS.lng, online: true },
    archive: archive([]),
  },
  "lumen-line-bt": {
    typicalPrice: 4000,
    hassleHours: 2,
    percentFee: 0,
    simpleTerms: [
      "0% fee only if the transfer posts in 45 days.",
      "After that the fee is 5%. Purchases lose 0% at month 6.",
    ],
    place: { label: "Lumen Line · online", lat: TIDEGLASS.lat, lng: TIDEGLASS.lng, online: true },
    archive: archive([]),
  },
  "cloudpath-loan-0": {
    typicalPrice: 6000,
    hassleHours: 1.2,
    monthlyFee: 9,
    simpleTerms: [
      "No origination fee. $9/mo if you skip their checking.",
      "One late payment can reprice the rest.",
    ],
    place: { label: "Cloudpath Flex · online", lat: TIDEGLASS.lat, lng: TIDEGLASS.lng, online: true },
    archive: archive([]),
  },
};
