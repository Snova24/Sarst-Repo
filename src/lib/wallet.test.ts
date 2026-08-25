import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadWallet, saveWallet, STORAGE_KEY, useWallet } from "./wallet";

type MemoryStorage = Storage & {
  store: Map<string, string>;
};

function createMemoryStorage(): MemoryStorage {
  const store = new Map<string, string>();
  const storage: MemoryStorage = {
    store,
    get length() {
      return store.size;
    },
    clear: vi.fn(() => {
      store.clear();
    }),
    getItem: vi.fn((key: string) => store.get(key) ?? null),
    key: vi.fn((index: number) => [...store.keys()][index] ?? null),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    }),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, String(value));
    }),
  };
  return storage;
}

function throwingStorage(): Storage {
  const boom = () => {
    throw new Error("localStorage unavailable");
  };
  return {
    get length() {
      return 0;
    },
    clear: boom,
    getItem: boom,
    key: boom,
    removeItem: boom,
    setItem: boom,
  };
}

describe("wallet storage", () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = createMemoryStorage();
    vi.stubGlobal("localStorage", storage);
    saveWallet([]);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("uses clipbook.wallet.v1 as the storage key", () => {
    expect(STORAGE_KEY).toBe("clipbook.wallet.v1");
  });

  it("saves and loads wallet entries", () => {
    const entries = [{ couponId: "harbor-pantry-10", clippedAt: "2026-08-20T10:00:00.000Z" }];
    saveWallet(entries);
    expect(storage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify(entries));
    expect(loadWallet()).toEqual(entries);
  });

  it("returns an empty list for missing or invalid storage", () => {
    expect(loadWallet()).toEqual([]);
    storage.store.set(STORAGE_KEY, "{not json");
    expect(loadWallet()).toEqual([]);
    storage.store.set(STORAGE_KEY, '{"couponId":"x"}');
    expect(loadWallet()).toEqual([]);
  });

  it("falls back to in-memory storage when localStorage throws", () => {
    vi.stubGlobal("localStorage", throwingStorage());
    const entries = [{ couponId: "alpha-live", clippedAt: "2026-08-20T00:00:00.000Z" }];
    saveWallet(entries);
    expect(loadWallet()).toEqual(entries);
  });
});

describe("useWallet", () => {
  let storage: MemoryStorage;

  beforeEach(() => {
    storage = createMemoryStorage();
    vi.stubGlobal("localStorage", storage);
    saveWallet([]);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("clips a coupon, persists it, and reports isClipped", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-25T15:00:00.000Z"));
    const { result } = renderHook(() => useWallet());

    expect(result.current.entries).toEqual([]);
    expect(result.current.isClipped("alpha-live")).toBe(false);

    act(() => {
      result.current.clip("alpha-live");
    });

    expect(result.current.entries).toEqual([
      { couponId: "alpha-live", clippedAt: "2026-08-25T15:00:00.000Z" },
    ]);
    expect(result.current.isClipped("alpha-live")).toBe(true);
    expect(storage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      JSON.stringify([{ couponId: "alpha-live", clippedAt: "2026-08-25T15:00:00.000Z" }]),
    );
  });

  it("does not duplicate an already clipped coupon", () => {
    const { result } = renderHook(() => useWallet());
    act(() => {
      result.current.clip("alpha-live");
      result.current.clip("alpha-live");
    });
    expect(result.current.entries).toHaveLength(1);
  });

  it("unclips a coupon and persists the removal", () => {
    const { result } = renderHook(() => useWallet());
    act(() => {
      result.current.clip("alpha-live");
      result.current.clip("beta-live");
    });
    act(() => {
      result.current.unclip("alpha-live");
    });
    expect(result.current.entries.map((e) => e.couponId)).toEqual(["beta-live"]);
    expect(result.current.isClipped("alpha-live")).toBe(false);
    expect(loadWallet().map((e) => e.couponId)).toEqual(["beta-live"]);
  });

  it("marks a clipped coupon used and unused", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-25T16:00:00.000Z"));
    const { result } = renderHook(() => useWallet());

    act(() => {
      result.current.clip("alpha-live");
    });
    expect(result.current.isUsed("alpha-live")).toBe(false);

    act(() => {
      result.current.markUsed("alpha-live");
    });
    expect(result.current.isUsed("alpha-live")).toBe(true);
    expect(result.current.entries[0].usedAt).toBe("2026-08-25T16:00:00.000Z");

    act(() => {
      result.current.markUnused("alpha-live");
    });
    expect(result.current.isUsed("alpha-live")).toBe(false);
    expect(result.current.entries[0].usedAt).toBeUndefined();
    expect(loadWallet()[0].usedAt).toBeUndefined();
  });

  it("reloads clipped entries from localStorage on a fresh hook", () => {
    const { result, unmount } = renderHook(() => useWallet());
    act(() => {
      result.current.clip("gamma-live");
    });
    unmount();

    const again = renderHook(() => useWallet());
    expect(again.result.current.isClipped("gamma-live")).toBe(true);
    expect(again.result.current.entries).toHaveLength(1);
  });

  it("stamps punch-card tasks, auto-clips, and lets you undo", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-25T17:00:00.000Z"));
    const { result } = renderHook(() => useWallet());

    act(() => {
      result.current.toggleAction("harbor-pantry-circuit", "produce");
    });

    expect(result.current.isClipped("harbor-pantry-circuit")).toBe(true);
    expect(result.current.completedActions("harbor-pantry-circuit")).toEqual(["produce"]);

    act(() => {
      result.current.toggleAction("harbor-pantry-circuit", "bakery");
      result.current.toggleAction("harbor-pantry-circuit", "produce");
    });

    expect(result.current.completedActions("harbor-pantry-circuit")).toEqual(["bakery"]);
    expect(loadWallet()[0].completedActionIds).toEqual(["bakery"]);
  });

  it("keeps clip and used state in memory when localStorage is missing", () => {
    vi.stubGlobal("localStorage", throwingStorage());
    saveWallet([]);
    const { result } = renderHook(() => useWallet());

    act(() => {
      result.current.clip("alpha-live");
      result.current.markUsed("alpha-live");
    });

    expect(result.current.isClipped("alpha-live")).toBe(true);
    expect(result.current.isUsed("alpha-live")).toBe(true);
    expect(loadWallet()).toHaveLength(1);
  });
});
