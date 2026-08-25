import { useCallback, useState } from "react";
import type { WalletEntry } from "../types";

export const STORAGE_KEY = "clipbook.wallet.v1";

let memoryStore: WalletEntry[] = [];

export function loadWallet(): WalletEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as WalletEntry[];
    } catch {
      return [];
    }
  } catch {
    return memoryStore;
  }
}

export function saveWallet(entries: WalletEntry[]): void {
  memoryStore = entries;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // localStorage unavailable — keep the in-memory copy
  }
}

export function useWallet() {
  const [entries, setEntries] = useState<WalletEntry[]>(() => loadWallet());

  const clip = useCallback((id: string) => {
    setEntries((prev) => {
      if (prev.some((entry) => entry.couponId === id)) return prev;
      const next = [...prev, { couponId: id, clippedAt: new Date().toISOString() }];
      saveWallet(next);
      return next;
    });
  }, []);

  const unclip = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((entry) => entry.couponId !== id);
      saveWallet(next);
      return next;
    });
  }, []);

  const markUsed = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.map((entry) =>
        entry.couponId === id ? { ...entry, usedAt: new Date().toISOString() } : entry,
      );
      saveWallet(next);
      return next;
    });
  }, []);

  const markUnused = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.map((entry) => {
        if (entry.couponId !== id) return entry;
        return { couponId: entry.couponId, clippedAt: entry.clippedAt };
      });
      saveWallet(next);
      return next;
    });
  }, []);

  const isClipped = useCallback(
    (id: string) => entries.some((entry) => entry.couponId === id),
    [entries],
  );

  const isUsed = useCallback(
    (id: string) => entries.some((entry) => entry.couponId === id && Boolean(entry.usedAt)),
    [entries],
  );

  return { entries, clip, unclip, markUsed, markUnused, isClipped, isUsed };
}
