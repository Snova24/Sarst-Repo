import { useCallback, useState } from "react";
import { MEMBERSHIPS, type Membership } from "../data/memberships";
import { COUPONS } from "../data/catalog";
import type { Coupon } from "../types";
import { lookupCode } from "./barcode";
import { milesBetween, type Coords } from "./geo";
import { isExpired } from "./format";

export type NearbyReminder = {
  club: Membership;
  miles: number;
  coupons: Coupon[];
};

export type ScanHit = { kind: "coupon" | "club"; id: string };

export const CLUB_KEY = "clipbook.clubs.v1";
export const NEAR_MILES = 1.25;

let memoryClubs: string[] = [];

export function loadClubs(): string[] {
  try {
    const raw = localStorage.getItem(CLUB_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return memoryClubs;
  }
}

export function saveClubs(ids: string[]): void {
  memoryClubs = ids;
  try {
    localStorage.setItem(CLUB_KEY, JSON.stringify(ids));
  } catch {
    /* memory only */
  }
}

export function getMembership(id: string): Membership | undefined {
  return MEMBERSHIPS.find((club) => club.id === id);
}

export function liveClubCoupons(club: Membership, now = new Date()) {
  return club.couponIds
    .map((id) => COUPONS.find((coupon) => coupon.id === id))
    .filter((coupon): coupon is NonNullable<typeof coupon> => Boolean(coupon))
    .filter((coupon) => !isExpired(coupon.expiresAt, now));
}

export function nearbyReminders(
  enrolledIds: string[],
  here: Coords | null,
  now = new Date(),
): NearbyReminder[] {
  if (!here) return [];
  return enrolledIds
    .map((id) => getMembership(id))
    .filter((club): club is Membership => Boolean(club))
    .map((club) => {
      const miles = milesBetween(here, club.place);
      const coupons = liveClubCoupons(club, now);
      return { club, miles, coupons };
    })
    .filter((row) => row.miles <= NEAR_MILES && row.coupons.length > 0)
    .sort((a, b) => a.miles - b.miles);
}

export function lookupScan(raw: string): ScanHit | null {
  const couponHit = lookupCode(
    raw,
    COUPONS.map((coupon) => coupon.code),
  );
  if (couponHit) {
    const coupon = COUPONS.find((item) => item.code === couponHit);
    return coupon ? { kind: "coupon", id: coupon.id } : null;
  }
  const clubHit = lookupCode(
    raw,
    MEMBERSHIPS.map((club) => club.memberNumber),
  );
  if (clubHit) {
    const club = MEMBERSHIPS.find((item) => item.memberNumber === clubHit);
    return club ? { kind: "club", id: club.id } : null;
  }
  return null;
}

export function useClubs() {
  const [ids, setIds] = useState<string[]>(() => loadClubs());

  const join = useCallback((id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveClubs(next);
      return next;
    });
  }, []);

  const leave = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.filter((item) => item !== id);
      saveClubs(next);
      return next;
    });
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, join, leave, has };
}
