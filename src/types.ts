export const CATEGORIES = [
  "grocery",
  "dining",
  "retail",
  "travel",
  "beauty",
  "home",
  "entertainment",
  "tech",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Discount =
  | { kind: "percent"; value: number }
  | { kind: "amount"; value: number }
  | { kind: "bogo" }
  | { kind: "freeShipping" };

export interface Coupon {
  id: string;
  merchant: string;
  merchantTagline: string;
  title: string;
  description: string;
  code: string;
  category: Category;
  discount: Discount;
  /** ISO date, end of day in local interpretation is fine */
  expiresAt: string;
  /** ISO date the deal was published */
  publishedAt: string;
  minSpend?: number;
  terms: string;
  featured?: boolean;
  /** Ticket accent, hex */
  color: string;
}

export interface WalletEntry {
  couponId: string;
  clippedAt: string;
  usedAt?: string;
}

export type SortKey = "ending" | "save" | "newest";

export interface CouponQuery {
  search: string;
  category: Category | "all";
  sort: SortKey;
  walletOnly?: boolean;
}
