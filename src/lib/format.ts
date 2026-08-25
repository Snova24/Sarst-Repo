import type { Discount } from "../types";

export function formatDiscount(discount: Discount): string {
  switch (discount.kind) {
    case "percent":
      return `${discount.value}% off`;
    case "amount":
      return `$${discount.value} off`;
    case "bogo":
      return "BOGO";
    case "freeShipping":
      return "Free ship";
  }
}

export function discountScore(discount: Discount): number {
  switch (discount.kind) {
    case "percent":
      return discount.value;
    case "amount":
      return Math.min(80, discount.value);
    case "bogo":
      return 50;
    case "freeShipping":
      return 15;
  }
}

export function estimatedSave(discount: Discount, minSpend = 0): number {
  switch (discount.kind) {
    case "amount":
      return discount.value;
    case "percent":
      return Math.round(((minSpend || 40) * discount.value) / 100);
    case "bogo":
      return Math.round((minSpend || 24) / 2);
    case "freeShipping":
      return 8;
  }
}

export function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatExpiry(iso: string, now = new Date()): string {
  const end = new Date(`${iso}T23:59:59`);
  const days = Math.ceil((end.getTime() - now.getTime()) / 86_400_000);
  if (days < 0) return "Expired";
  if (days === 0) return "Ends today";
  if (days === 1) return "Ends tomorrow";
  if (days < 14) return `${days} days left`;
  return `Until ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

export function isExpired(iso: string, now = new Date()): boolean {
  return new Date(`${iso}T23:59:59`).getTime() < now.getTime();
}

export function daysLeft(iso: string, now = new Date()): number {
  const end = new Date(`${iso}T23:59:59`);
  return Math.ceil((end.getTime() - now.getTime()) / 86_400_000);
}

export const CATEGORY_LABEL: Record<string, string> = {
  grocery: "Grocery",
  dining: "Dining",
  retail: "Retail",
  travel: "Travel",
  beauty: "Beauty",
  home: "Home",
  entertainment: "Out",
  tech: "Tech",
};
