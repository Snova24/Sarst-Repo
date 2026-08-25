import { useCallback, useEffect, useRef, useState } from "react";
import { COUPONS } from "./data/catalog";
import { filterCoupons, getCoupon, isUnlocked, walletSavings } from "./lib/coupons";
import { useWallet } from "./lib/wallet";
import { formatMoney, isExpired } from "./lib/format";
import type { Category, Coupon, SortKey } from "./types";
import { CouponDetail } from "./components/CouponDetail";
import { EmptyState } from "./components/EmptyState";
import { FeaturedDeal } from "./components/FeaturedDeal";
import { Header } from "./components/Header";
import { Ticket } from "./components/Ticket";
import { TicketGrid } from "./components/TicketGrid";
import { Toast } from "./components/Toast";
import { Toolbar } from "./components/Toolbar";
import { ViewToggle, type AppView } from "./components/ViewToggle";

async function writeClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      /* fall through to execCommand */
    }
  }
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-9999px";
  document.body.appendChild(field);
  field.select();
  document.execCommand("copy");
  document.body.removeChild(field);
}

function walletRank(coupon: Coupon, used: boolean, now: Date): number {
  if (isExpired(coupon.expiresAt, now)) return 2;
  if (used) return 1;
  return 0;
}

export default function App() {
  const wallet = useWallet();
  const now = new Date();
  const [view, setView] = useState<AppView>("browse");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortKey>("ending");
  const [tasksOnly, setTasksOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const savings = walletSavings(COUPONS, wallet.entries, now);
  const selected = selectedId ? getCoupon(selectedId) : undefined;
  const featured = COUPONS.find(
    (coupon) => coupon.featured && !isExpired(coupon.expiresAt, now),
  );

  const showToast = useCallback((message: string) => {
    if (toastTimer.current != null) window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current != null) window.clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selectedId]);

  const handleCopy = useCallback(
    async (coupon: Coupon) => {
      if (!isUnlocked(coupon, wallet.completedActions(coupon.id))) {
        setSelectedId(coupon.id);
        showToast("Stamp each task to unlock the code");
        return;
      }
      await writeClipboard(coupon.code);
      showToast(`Copied ${coupon.merchant} code`);
    },
    [showToast, wallet],
  );

  const closeDetail = useCallback(() => setSelectedId(null), []);

  const handleClip = useCallback(
    (id: string) => {
      if (wallet.isClipped(id)) wallet.unclip(id);
      else wallet.clip(id);
    },
    [wallet],
  );

  const visible = (() => {
    if (view === "wallet") {
      const clipped = COUPONS.filter((coupon) => wallet.isClipped(coupon.id));
      const filtered = filterCoupons(
        clipped,
        { search, category, sort, walletOnly: true, tasksOnly },
        now,
      );
      return [...filtered].sort(
        (a, b) =>
          walletRank(a, wallet.isUsed(a.id), now) -
          walletRank(b, wallet.isUsed(b.id), now),
      );
    }
    return filterCoupons(COUPONS, { search, category, sort, tasksOnly }, now);
  })();

  const gridCoupons =
    view === "browse" && featured && visible.some((coupon) => coupon.id === featured.id)
      ? visible.filter((coupon) => coupon.id !== featured.id)
      : visible;

  const walletEmpty = view === "wallet" && wallet.entries.length === 0;
  const noMatches = !walletEmpty && visible.length === 0;

  return (
    <div className="page">
      <Header
        walletCount={wallet.entries.length}
        savings={formatMoney(savings)}
        onOpenWallet={() => setView("wallet")}
      />
      <ViewToggle view={view} onChange={setView} />

      <main id="panel-deals" role="tabpanel" aria-labelledby={`tab-${view}`}>
        {view === "browse" &&
        featured &&
        visible.some((coupon) => coupon.id === featured.id) ? (
          <FeaturedDeal
            coupon={featured}
            now={now}
            clipped={wallet.isClipped(featured.id)}
            completedActionIds={wallet.completedActions(featured.id)}
            onOpen={() => setSelectedId(featured.id)}
            onClip={() => handleClip(featured.id)}
            onCopy={() => void handleCopy(featured)}
          />
        ) : null}

        {!walletEmpty ? (
          <Toolbar
            search={search}
            category={category}
            sort={sort}
            tasksOnly={tasksOnly}
            onSearch={setSearch}
            onCategory={setCategory}
            onSort={setSort}
            onTasksOnly={setTasksOnly}
          />
        ) : null}

        {walletEmpty ? (
          <EmptyState
            title="Nothing clipped yet"
            body="Your booklet is empty. Browse the circular, clip a ticket, and it will live here until you spend it."
            actionLabel="Browse deals"
            onAction={() => setView("browse")}
          />
        ) : noMatches ? (
          <EmptyState
            title={view === "wallet" ? "No clipped deals match" : "No deals match"}
            body="Try another category, clear the search, or switch the sort."
          />
        ) : (
          <TicketGrid>
            {gridCoupons.map((coupon) => (
              <Ticket
                key={coupon.id}
                coupon={coupon}
                now={now}
                clipped={wallet.isClipped(coupon.id)}
                used={wallet.isUsed(coupon.id)}
                completedActionIds={wallet.completedActions(coupon.id)}
                onOpen={() => setSelectedId(coupon.id)}
                onClip={() => handleClip(coupon.id)}
                onCopy={() => void handleCopy(coupon)}
              />
            ))}
          </TicketGrid>
        )}
      </main>

      {selected ? (
        <CouponDetail
          coupon={selected}
          now={now}
          clipped={wallet.isClipped(selected.id)}
          used={wallet.isUsed(selected.id)}
          completedActionIds={wallet.completedActions(selected.id)}
          onClose={closeDetail}
          onClip={() => handleClip(selected.id)}
          onCopy={() => void handleCopy(selected)}
          onToggleUsed={() => {
            if (wallet.isUsed(selected.id)) wallet.markUnused(selected.id);
            else wallet.markUsed(selected.id);
          }}
          onToggleAction={(actionId) => wallet.toggleAction(selected.id, actionId)}
        />
      ) : null}

      <Toast message={toast} />
    </div>
  );
}
