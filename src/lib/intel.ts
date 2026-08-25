import { DEAL_INTEL, TIDEGLASS } from "../data/intel";
import type { Coupon, DealIntel, GeoPlace } from "../types";
import { dealValue } from "./coupons";
import { formatMoney } from "./format";
import { formatMiles, milesBetween, type Coords } from "./geo";

export type Verdict = "worth" | "borderline" | "skip";
export type PriceLegit = "legit" | "inflated" | "always-on" | "unknown";

export interface WorthReport {
  verdict: Verdict;
  headline: string;
  net: number;
  claimed: number;
  fees: number;
  claimedDiscountPct: number | null;
  trueDiscountPct: number | null;
  priceLegit: PriceLegit;
  archiveMedian: number | null;
  hassleHours: number;
  dollarsPerHour: number | null;
  miles: number | null;
  nearby: boolean | null;
  online: boolean;
  placeLabel: string;
  simpleTerms: string[];
  detailedTerms: string[];
  mathLines: string[];
  intel: DealIntel;
}

const NEARBY_MILES = 12;
const WORTH_NET = 25;
const WORTH_HOURLY = 12;

export function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function splitTerms(text: string): string[] {
  return text
    .split(/(?<=\.)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseLeadingDollar(text?: string): number {
  if (!text) return 0;
  const m = text.replace(/,/g, "").match(/\$(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : 0;
}

function parseLeadingPercent(text?: string): number {
  if (!text) return 0;
  const m = text.match(/(\d+(?:\.\d+)?)\s*%/);
  return m ? Number(m[1]) : 0;
}

export function inferIntel(coupon: Coupon): DealIntel {
  const hassleHours = coupon.money
    ? coupon.money.kind === "bankBonus"
      ? 4
      : 2
    : coupon.actions?.length
      ? 1.5
      : 0.5;
  const typicalPrice = coupon.minSpend ?? coupon.money?.typicalBalance ?? coupon.money?.claimed ?? 40;
  let advertisedNow: number | undefined;
  let advertisedWas: number | undefined;
  if (coupon.discount.kind === "percent") {
    advertisedWas = typicalPrice;
    advertisedNow = Math.round(typicalPrice * (1 - coupon.discount.value / 100) * 100) / 100;
  } else if (coupon.discount.kind === "amount") {
    advertisedWas = typicalPrice;
    advertisedNow = Math.max(0, typicalPrice - coupon.discount.value);
  } else if (coupon.discount.kind === "bogo") {
    advertisedWas = typicalPrice;
    advertisedNow = typicalPrice / 2;
  }
  const place: GeoPlace = coupon.money
    ? { ...TIDEGLASS, online: true, label: `${coupon.merchant} · online` }
    : { ...TIDEGLASS, label: `${coupon.merchant} · Tideglass` };
  return {
    advertisedWas,
    advertisedNow,
    typicalPrice,
    archive: [],
    place,
    hassleHours,
    simpleTerms: splitTerms(coupon.terms).slice(0, 4),
    monthlyFee: parseLeadingDollar(coupon.money?.monthlyFee),
    oneTimeFee: parseLeadingDollar(coupon.money?.originationFee) || parseLeadingDollar(coupon.money?.transferFee),
    percentFee: parseLeadingPercent(coupon.money?.originationFee) || parseLeadingPercent(coupon.money?.transferFee),
    annualFee: parseLeadingDollar(coupon.money?.annualFee),
  };
}

export function intelFor(coupon: Coupon): DealIntel {
  const extra = DEAL_INTEL[coupon.id];
  if (!extra) return inferIntel(coupon);
  const base = inferIntel(coupon);
  return {
    ...base,
    ...extra,
    simpleTerms: extra.simpleTerms.length ? extra.simpleTerms : base.simpleTerms,
    archive: extra.archive,
    place: extra.place ?? base.place,
  };
}

export function priceLegitimacy(intel: DealIntel): {
  legit: PriceLegit;
  archiveMedian: number | null;
  trueDiscountPct: number | null;
  claimedDiscountPct: number | null;
} {
  const prior = intel.archive
    .filter((row) => row.source !== "shelf" || !row.note?.toLowerCase().includes("with "))
    .map((row) => row.price);
  const fromWeb = intel.archive
    .filter((row) => row.source === "web" || row.source === "archive")
    .map((row) => row.price);
  const archiveMedian = median(fromWeb.length ? fromWeb : prior);
  const claimedDiscountPct =
    intel.advertisedWas && intel.advertisedNow != null && intel.advertisedWas > 0
      ? Math.round(((intel.advertisedWas - intel.advertisedNow) / intel.advertisedWas) * 1000) / 10
      : null;
  const trueDiscountPct =
    archiveMedian && intel.advertisedNow != null && archiveMedian > 0
      ? Math.round(((archiveMedian - intel.advertisedNow) / archiveMedian) * 1000) / 10
      : null;

  if (archiveMedian == null || intel.advertisedNow == null) {
    return { legit: "unknown", archiveMedian, trueDiscountPct, claimedDiscountPct };
  }

  if (intel.advertisedWas) {
    const nowVsArchive = Math.abs(intel.advertisedNow - archiveMedian) / archiveMedian;
    if (intel.advertisedWas > archiveMedian * 1.15 && nowVsArchive < 0.12) {
      return { legit: "inflated", archiveMedian, trueDiscountPct, claimedDiscountPct };
    }
  }

  const alwaysOn =
    fromWeb.length >= 2 &&
    Math.max(...fromWeb) - Math.min(...fromWeb) <= Math.max(0.5, archiveMedian * 0.04) &&
    intel.advertisedNow != null &&
    Math.abs(intel.advertisedNow - archiveMedian) / archiveMedian < 0.08;

  if (alwaysOn) {
    return { legit: "always-on", archiveMedian, trueDiscountPct, claimedDiscountPct };
  }

  return { legit: "legit", archiveMedian, trueDiscountPct, claimedDiscountPct };
}

export function feeDrag(coupon: Coupon, intel: DealIntel): number {
  const base = intel.typicalPrice ?? coupon.money?.typicalBalance ?? coupon.money?.claimed ?? 0;
  const months = coupon.money?.holdMonths ?? 0;
  const monthly = (intel.monthlyFee ?? 0) * months;
  const annual = intel.annualFee ?? 0;
  const percent = ((intel.percentFee ?? 0) / 100) * base;
  const oneTime = intel.oneTimeFee ?? 0;
  return Math.round((monthly + annual + percent + oneTime) * 100) / 100;
}

export function analyzeDeal(coupon: Coupon, here: Coords | null = null): WorthReport {
  const intel = intelFor(coupon);
  const claimed = dealValue(coupon);
  const fees = feeDrag(coupon, intel);
  const net = Math.round((claimed - fees) * 100) / 100;
  const { legit, archiveMedian, trueDiscountPct, claimedDiscountPct } = priceLegitimacy(intel);
  const hassleHours = intel.hassleHours;
  const dollarsPerHour = hassleHours > 0 ? Math.round((net / hassleHours) * 10) / 10 : null;
  const place = intel.place ?? TIDEGLASS;
  const miles = here && !place.online ? milesBetween(here, place) : here && place.online ? 0 : null;
  const nearby = miles == null ? null : place.online || miles <= NEARBY_MILES;

  let verdict: Verdict = "borderline";
  if (legit === "inflated" && (trueDiscountPct ?? 0) < 12) verdict = "skip";
  else if (legit === "always-on" && claimed < 20) verdict = "skip";
  else if (net < 10) verdict = "skip";
  else if (net >= WORTH_NET && (dollarsPerHour == null || dollarsPerHour >= WORTH_HOURLY) && legit !== "inflated")
    verdict = "worth";
  else if (net > 0) verdict = "borderline";
  else verdict = "skip";

  const headline =
    verdict === "worth"
      ? `Worth it — about ${formatMoney(net)} after the traps`
      : verdict === "skip"
        ? `Skip — the headline does not survive the math`
        : `Borderline — ${formatMoney(net)} if you actually finish`;

  const mathLines = [
    `Claimed benefit ${formatMoney(claimed)}`,
    fees > 0 ? `Fees / drag −${formatMoney(fees)}` : `No dollar fees modeled`,
    `Net ${formatMoney(net)}`,
    hassleHours ? `Hassle ~${hassleHours} hr → ${dollarsPerHour != null ? `${formatMoney(dollarsPerHour)}/hr` : "n/a"}` : null,
    claimedDiscountPct != null ? `Ad says ${claimedDiscountPct}% off` : null,
    archiveMedian != null ? `Archive / web median ${formatMoney(archiveMedian)}` : "No archive capture on file",
    trueDiscountPct != null ? `True cut vs archive ${trueDiscountPct}%` : null,
    legit === "inflated" ? "Was-price looks marked up versus archived web/shelf" : null,
    legit === "always-on" ? "Archive shows this promo was already the usual price" : null,
    legit === "legit" ? "Archive agrees the prior price was real" : null,
    miles != null && !place.online ? `GPS ${formatMiles(miles)} from ${place.label}` : place.online ? "Online — GPS not required" : "GPS off — pin Tideglass to estimate a drive",
  ].filter((line): line is string => Boolean(line));

  const detailedTerms = [
    coupon.terms,
    ...(coupon.money?.requirements.map((item) => `Qualify: ${item}`) ?? []),
    ...(coupon.money?.gotchas.map((item) => `Trap: ${item}`) ?? []),
    coupon.money?.safeExit ? `Safe exit: ${coupon.money.safeExit}` : "",
  ].filter(Boolean);

  return {
    verdict,
    headline,
    net,
    claimed,
    fees,
    claimedDiscountPct,
    trueDiscountPct,
    priceLegit: legit,
    archiveMedian,
    hassleHours,
    dollarsPerHour,
    miles,
    nearby,
    online: place.online,
    placeLabel: place.label,
    simpleTerms: intel.simpleTerms,
    detailedTerms,
    mathLines,
    intel,
  };
}
