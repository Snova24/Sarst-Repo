import { COUPONS } from "../data/catalog";
import type { Coupon, CouponQuery, SortKey, WalletEntry } from "../types";
import { discountScore, estimatedSave, isExpired } from "./format";

export function getCoupon(id: string): Coupon | undefined {
  return COUPONS.find((coupon) => coupon.id === id);
}

export function isActionDeal(coupon: Coupon): boolean {
  return (coupon.actions?.length ?? 0) > 0;
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
  return actionProgress(coupon, completedIds).unlocked;
}

function matchesSearch(coupon: Coupon, search: string): boolean {
  const q = search.trim().toLowerCase();
  if (!q) return true;
  const actionText = (coupon.actions ?? [])
    .flatMap((action) => [action.label, action.hint ?? ""])
    .join(" ");
  const haystack = [
    coupon.merchant,
    coupon.title,
    coupon.description,
    coupon.code,
    actionText,
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
    if (query.category !== "all" && coupon.category !== query.category) return false;
    if (query.tasksOnly && !isActionDeal(coupon)) return false;
    if (!query.walletOnly && isExpired(coupon.expiresAt, now)) return false;
    return true;
  });

  return filtered.sort((a, b) => {
    if (query.walletOnly) {
      const aExpired = isExpired(a.expiresAt, now);
      const bExpired = isExpired(b.expiresAt, now);
      if (aExpired !== bExpired) return aExpired ? 1 : -1;
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
    total += estimatedSave(coupon.discount, coupon.minSpend);
  }
  return total;
}
