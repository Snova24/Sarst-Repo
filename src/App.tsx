import { useCallback, useEffect, useRef, useState } from "react";
import { COUPONS } from "./data/catalog";
import {
  dealValue,
  filterCoupons,
  getCoupon,
  isBalanceTransfer,
  isBankBonus,
  isHighValue,
  isPersonalLoan,
  isUnlocked,
  walletSavings,
} from "./lib/coupons";
import { useWallet } from "./lib/wallet";
import { useBookletLocation } from "./lib/location";
import { formatMoney, isExpired } from "./lib/format";
import type { Coupon, Interest, SortKey } from "./types";
import { CouponDetail } from "./components/CouponDetail";
import { DealSection } from "./components/DealSection";
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
  const geo = useBookletLocation();
  const now = new Date();
  const [view, setView] = useState<AppView>("browse");
  const [search, setSearch] = useState("");
  const [interest, setInterest] = useState<Interest | "all">("all");
  const [sort, setSort] = useState<SortKey>("ending");
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
        { search, interest, sort, walletOnly: true },
        now,
      );
      return [...filtered].sort(
        (a, b) =>
          walletRank(a, wallet.isUsed(a.id), now) -
          walletRank(b, wallet.isUsed(b.id), now),
      );
    }
    return filterCoupons(COUPONS, { search, interest, sort }, now);
  })();

  const gridCoupons =
    view === "browse" && featured && visible.some((coupon) => coupon.id === featured.id)
      ? visible.filter((coupon) => coupon.id !== featured.id)
      : visible;

  const showSections =
    view === "browse" &&
    (interest === "all" ||
      interest === "highValue" ||
      interest === "bank" ||
      interest === "zeroAprCard" ||
      interest === "zeroAprLoan");
  const highValue = [...gridCoupons]
    .filter(isHighValue)
    .sort((a, b) => dealValue(b) - dealValue(a));
  const circular = gridCoupons.filter((coupon) => !coupon.money);
  const bankBonuses = gridCoupons.filter(isBankBonus);
  const balanceTransfers = gridCoupons.filter(isBalanceTransfer);
  const personalLoans = gridCoupons.filter(isPersonalLoan);

  const ticketFor = (coupon: Coupon, showWorth = false) => (
    <Ticket
      key={coupon.id}
      coupon={coupon}
      now={now}
      clipped={wallet.isClipped(coupon.id)}
      used={wallet.isUsed(coupon.id)}
      completedActionIds={wallet.completedActions(coupon.id)}
      showWorth={showWorth}
      onOpen={() => setSelectedId(coupon.id)}
      onClip={() => handleClip(coupon.id)}
      onCopy={() => void handleCopy(coupon)}
    />
  );

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
        interest === "grocery" &&
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
            interest={interest}
            sort={sort}
            onSearch={setSearch}
            onInterest={setInterest}
            onSort={setSort}
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
            body="Try another interest, clear the search, or switch the sort."
          />
        ) : showSections ? (
          <>
            {(interest === "all" || interest === "highValue") && highValue.length > 0 ? (
              <DealSection
                kicker="Get the most"
                title="Highest value discounts and benefits"
                lede="The fattest dollars in this circular — bank bonuses, 0% interest windows, and anything worth $80 or more. Start here if you want Clipbook to pay for itself."
              >
                <TicketGrid>{highValue.map((coupon) => ticketFor(coupon, true))}</TicketGrid>
              </DealSection>
            ) : null}
            {interest === "all" && circular.length > 0 ? (
              <DealSection
                kicker="The circular"
                title="Clip and save"
                lede="Grocery, dining, shopping, and the rest of the paper insert. Copy a code, clip it, spend it."
              >
                <TicketGrid>{circular.map((coupon) => ticketFor(coupon))}</TicketGrid>
              </DealSection>
            ) : null}
            {(interest === "all" || interest === "bank") && bankBonuses.length > 0 ? (
              <DealSection
                kicker="Sneaky bank ads"
                title="Hundreds of dollars to open an account"
                lede="They advertise $250–$400 for signing up. Direct deposit, monthly fees, and clawbacks are how they keep you. Stamp the path, wait out the hold, then close and wipe your hands."
              >
                <TicketGrid>{bankBonuses.map((coupon) => ticketFor(coupon))}</TicketGrid>
              </DealSection>
            ) : null}
            {(interest === "all" ||
              interest === "zeroAprCard" ||
              interest === "zeroAprLoan") &&
            (balanceTransfers.length > 0 || personalLoans.length > 0) ? (
              <DealSection
                kicker="0% intro"
                title="Credit cards and personal loans"
                lede="Balance transfers and personal loans that start at 0%. Fees, then-APR, and a dated payoff are the real terms. Safe exit is $0 before the window ends — then close or walk."
              >
                {(interest === "all" || interest === "zeroAprCard") &&
                balanceTransfers.length > 0 ? (
                  <div className="deal-subsection">
                    <h3>Balance transfers · 0% interest</h3>
                    <p>
                      Move existing card debt. Watch the transfer fee, the late-payment
                      trap, and the month the leftover starts compounding.
                    </p>
                    <TicketGrid>
                      {balanceTransfers.map((coupon) => ticketFor(coupon))}
                    </TicketGrid>
                  </div>
                ) : null}
                {(interest === "all" || interest === "zeroAprLoan") &&
                personalLoans.length > 0 ? (
                  <div className="deal-subsection">
                    <h3>Personal loans · 0% interest</h3>
                    <p>
                      Origination fees are interest by another name. Payoff letter,
                      then you are done — there is no account to keep.
                    </p>
                    <TicketGrid>
                      {personalLoans.map((coupon) => ticketFor(coupon))}
                    </TicketGrid>
                  </div>
                ) : null}
              </DealSection>
            ) : null}
          </>
        ) : (
          <TicketGrid>{gridCoupons.map((coupon) => ticketFor(coupon))}</TicketGrid>
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
          here={geo.coords}
          geoStatus={geo.status}
          geoSource={geo.source}
          onRequestGps={geo.requestGps}
          onUseTideglass={geo.useTideglass}
          onClearGeo={geo.clear}
        />
      ) : null}

      <Toast message={toast} />
    </div>
  );
}
