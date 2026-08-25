import { COUPONS } from "../data/catalog";
import type { Coupon, CouponQuery, Interest, SortKey, WalletEntry } from "../types";
import { discountScore, estimatedSave, isExpired } from "./format";

export const HIGH_VALUE_MIN = 80;

export function dealValue(coupon: Coupon): number {
  return estimatedSave(coupon.discount, coupon.minSpend, coupon.money);
}

export function isHighValue(coupon: Coupon): boolean {
  return dealValue(coupon) >= HIGH_VALUE_MIN;
}

export function matchesInterest(coupon: Coupon, interest: Interest | "all"): boolean {
  switch (interest) {
    case "all":
      return true;
    case "highValue":
      return isHighValue(coupon);
    case "grocery":
      return coupon.category === "grocery";
    case "dining":
      return coupon.category === "dining";
    case "shopping":
      return coupon.category === "retail" || coupon.category === "beauty" || coupon.category === "home";
    case "travel":
      return coupon.category === "travel";
    case "out":
      return coupon.category === "entertainment";
    case "tech":
      return coupon.category === "tech";
    case "bank":
      return coupon.category === "bank";
    case "zeroAprCard":
      return isBalanceTransfer(coupon);
    case "zeroAprLoan":
      return isPersonalLoan(coupon);
    case "tasks":
      return isActionDeal(coupon);
  }
}

export function getCoupon(id: string): Coupon | undefined {
  return COUPONS.find((coupon) => coupon.id === id);
}

export function isActionDeal(coupon: Coupon): boolean {
  return (coupon.actions?.length ?? 0) > 0;
}

export function isMoneyDeal(coupon: Coupon): boolean {
  return coupon.money != null;
}

export function isBankBonus(coupon: Coupon): boolean {
  return coupon.money?.kind === "bankBonus";
}

export function isBalanceTransfer(coupon: Coupon): boolean {
  return coupon.money?.kind === "balanceTransfer";
}

export function isPersonalLoan(coupon: Coupon): boolean {
  return coupon.money?.kind === "personalLoan";
}

/** Grocery punch cards lock the code. Money deals keep the promo code available from day one. */
export function locksCode(coupon: Coupon): boolean {
  return isActionDeal(coupon) && !isMoneyDeal(coupon);
}

export function actionProgress(coupon: Coupon, completedIds: string[] = []) {
  const actions = coupon.actions ?? [];
  const total = actions.length;
  if (total === 0) {
    return { done: 0, total: 0, ratio: 1, unlocked: true };
  }
  const done = actions.filter((action) => completedIds.includes(action.id)).length;
  return { done, total, ratio: done / total, unlocked: done === total };
}

export function isUnlocked(coupon: Coupon, completedIds: string[] = []): boolean {
  if (!locksCode(coupon)) return true;
  return actionProgress(coupon, completedIds).unlocked;
}

function matchesSearch(coupon: Coupon, search: string): boolean {
  const q = search.trim().toLowerCase();
  if (!q) return true;
  const actionText = (coupon.actions ?? [])
    .flatMap((action) => [action.label, action.hint ?? ""])
    .join(" ");
  const money = coupon.money;
  const kindWords = !money
    ? ""
    : money.kind === "bankBonus"
      ? "bank bonus checking signup"
      : money.kind === "balanceTransfer"
        ? "balance transfer 0% apr card"
        : "personal loan 0% interest";
  const moneyText = money
    ? [
        kindWords,
        money.kind,
        money.safeExit,
        money.introApr ?? "",
        money.thenApr ?? "",
        money.transferFee ?? "",
        money.originationFee ?? "",
        ...money.requirements,
        ...money.gotchas,
        ...money.timeline.map((step) => `${step.at} ${step.label}`),
      ].join(" ")
    : "";
  const haystack = [
    coupon.merchant,
    coupon.title,
    coupon.description,
    coupon.code,
    actionText,
    moneyText,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

function compareBySort(a: Coupon, b: Coupon, sort: SortKey): number {
  switch (sort) {
    case "ending":
      return a.expiresAt.localeCompare(b.expiresAt);
    case "save":
      return discountScore(b.discount) - discountScore(a.discount);
    case "newest":
      return b.publishedAt.localeCompare(a.publishedAt);
  }
}

export function filterCoupons(
  coupons: Coupon[],
  query: CouponQuery,
  now: Date = new Date(),
): Coupon[] {
  const filtered = coupons.filter((coupon) => {
    if (!matchesSearch(coupon, query.search)) return false;
    if (!matchesInterest(coupon, query.interest)) return false;
    if (!query.walletOnly && isExpired(coupon.expiresAt, now)) return false;
    return true;
  });

  return filtered.sort((a, b) => {
    if (query.walletOnly) {
      const aExpired = isExpired(a.expiresAt, now);
      const bExpired = isExpired(b.expiresAt, now);
      if (aExpired !== bExpired) return aExpired ? 1 : -1;
    }
    if (query.interest === "highValue") {
      const byValue = dealValue(b) - dealValue(a);
      if (byValue !== 0) return byValue;
    }
    return compareBySort(a, b, query.sort);
  });
}

export function walletSavings(
  coupons: Coupon[],
  entries: WalletEntry[],
  now: Date = new Date(),
): number {
  const byId = new Map(coupons.map((coupon) => [coupon.id, coupon]));
  let total = 0;
  for (const entry of entries) {
    if (entry.usedAt) continue;
    const coupon = byId.get(entry.couponId);
    if (!coupon) continue;
    if (isExpired(coupon.expiresAt, now)) continue;
    if (!isUnlocked(coupon, entry.completedActionIds)) continue;
    total += estimatedSave(coupon.discount, coupon.minSpend, coupon.money);
  }
  return total;
}
