export const CATEGORIES = [
  "grocery",
  "dining",
  "retail",
  "travel",
  "beauty",
  "home",
  "entertainment",
  "tech",
  "bank",
  "credit",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Discount =
  | { kind: "percent"; value: number }
  | { kind: "amount"; value: number }
  | { kind: "bogo" }
  | { kind: "freeShipping" }
  | { kind: "bonus"; value: number }
  | { kind: "zeroApr"; months: number; flavor: "bt" | "loan" };

export interface CouponAction {
  id: string;
  label: string;
  hint?: string;
}

export type MoneyKind = "bankBonus" | "balanceTransfer" | "personalLoan";

export interface MoneyTimelineStep {
  at: string;
  label: string;
}

export interface MoneyOffer {
  kind: MoneyKind;
  /** Headline dollars the ad claims. */
  claimed: number;
  /** Months to keep the product before a clean close. */
  holdMonths: number;
  /** Days after open until the bonus typically posts. */
  bonusPostDays?: number;
  /** Days after posting (or open) they can claw the bonus back. */
  clawbackDays?: number;
  /** One-line earliest clean-exit rule. */
  safeExit: string;
  timeline: MoneyTimelineStep[];
  requirements: string[];
  gotchas: string[];
  introApr?: string;
  thenApr?: string;
  transferFee?: string;
  originationFee?: string;
  annualFee?: string;
  monthlyFee?: string;
  prepayPenalty: boolean;
  typicalBalance?: number;
  /** Rough interest avoided on a typical balance during the 0% window. */
  interestAvoided?: number;
}

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
  /** If set, the code stays locked until every action is confirmed — unless this is a money deal. */
  actions?: CouponAction[];
  /** Bank bonus, 0% BT card, or 0% personal loan with a clean-exit clock. */
  money?: MoneyOffer;
}

export interface PriceSnapshot {
  at: string;
  price: number;
  source: "shelf" | "web" | "archive";
  note?: string;
}

export interface GeoPlace {
  label: string;
  lat: number;
  lng: number;
  online: boolean;
}

export interface DealIntel {
  advertisedWas?: number;
  advertisedNow?: number;
  typicalPrice?: number;
  archive: PriceSnapshot[];
  place?: GeoPlace;
  hassleHours: number;
  simpleTerms: string[];
  monthlyFee?: number;
  oneTimeFee?: number;
  percentFee?: number;
  annualFee?: number;
}

export interface WalletEntry {
  couponId: string;
  clippedAt: string;
  usedAt?: string;
  completedActionIds?: string[];
}

export type SortKey = "ending" | "save" | "newest";

export const INTERESTS = [
  "highValue",
  "grocery",
  "dining",
  "shopping",
  "travel",
  "out",
  "tech",
  "bank",
  "zeroAprCard",
  "zeroAprLoan",
  "tasks",
] as const;

export type Interest = (typeof INTERESTS)[number];

export interface CouponQuery {
  search: string;
  interest: Interest | "all";
  sort: SortKey;
  walletOnly?: boolean;
}
