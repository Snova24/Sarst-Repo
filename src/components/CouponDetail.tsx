import { useEffect, useRef } from "react";
import type { Coupon } from "../types";
import { actionProgress, isActionDeal, isMoneyDeal, locksCode } from "../lib/coupons";
import {
  CATEGORY_LABEL,
  formatDiscount,
  formatExpiry,
  formatMoney,
  isExpired,
} from "../lib/format";
import type { Coords } from "../lib/geo";
import type { GeoStatus } from "../lib/location";
import { ActionList } from "./ActionList";
import { Barcode } from "./Barcode";
import { MoneyPanel } from "./MoneyPanel";
import { PunchBar } from "./PunchBar";
import { WorthIt } from "./WorthIt";

type CouponDetailProps = {
  coupon: Coupon;
  now: Date;
  clipped: boolean;
  used: boolean;
  completedActionIds: string[];
  onClose: () => void;
  onClip: () => void;
  onCopy: () => void;
  onToggleUsed: () => void;
  onToggleAction: (actionId: string) => void;
  here: Coords | null;
  geoStatus: GeoStatus;
  geoSource: "gps" | "tideglass" | null;
  onRequestGps: () => void;
  onUseTideglass: () => void;
  onClearGeo: () => void;
  onShowRegister: () => void;
};

export function CouponDetail({
  coupon,
  now,
  clipped,
  used,
  completedActionIds,
  onClose,
  onClip,
  onCopy,
  onToggleUsed,
  onToggleAction,
  here,
  geoStatus,
  geoSource,
  onRequestGps,
  onUseTideglass,
  onClearGeo,
  onShowRegister,
}: CouponDetailProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const expired = isExpired(coupon.expiresAt, now);
  const titleId = "coupon-detail-title";
  const taskDeal = isActionDeal(coupon);
  const money = coupon.money;
  const punch = actionProgress(coupon, completedActionIds);
  const codeLocked = locksCode(coupon) && !punch.unlocked;

  useEffect(() => {
    closeRef.current?.focus();
  }, [coupon.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="sheet-close"
          onClick={onClose}
          aria-label="Close coupon details"
        >
          <span aria-hidden="true">×</span>
        </button>

        <p className="stamp sheet-stamp">{CATEGORY_LABEL[coupon.category]}</p>
        <p className="sheet-merchant" id={titleId}>
          {coupon.merchant}
        </p>
        <p className="sheet-tagline">{coupon.merchantTagline}</p>
        <p className="sheet-discount">{formatDiscount(coupon.discount)}</p>
        <h2 className="sheet-title">{coupon.title}</h2>
        <p className="sheet-description">{coupon.description}</p>

        <WorthIt
          coupon={coupon}
          here={here}
          geoStatus={geoStatus}
          geoSource={geoSource}
          onRequestGps={onRequestGps}
          onUseTideglass={onUseTideglass}
          onClearGeo={onClearGeo}
        />

        <dl className="sheet-meta">
          <div>
            <dt>{money ? "Offer ends" : "Expires"}</dt>
            <dd>{formatExpiry(coupon.expiresAt, now)}</dd>
          </div>
          <div>
            <dt>{money ? "Clean exit" : "Min spend"}</dt>
            <dd>
              {money
                ? `${money.holdMonths} months`
                : coupon.minSpend != null
                  ? formatMoney(coupon.minSpend)
                  : "No minimum"}
            </dd>
          </div>
        </dl>

        {money ? <MoneyPanel money={money} /> : null}

        {taskDeal && coupon.actions ? (
          <section className="sheet-tasks">
            <h3>{isMoneyDeal(coupon) ? "Path to a clean exit" : "Stamp the card"}</h3>
            <p>
              {isMoneyDeal(coupon)
                ? "Confirm each step yourself. The promo code is available now. The bar is the hold — do not close until it is full."
                : "Confirm each task yourself. The code stays locked until the bar is full."}
            </p>
            <PunchBar done={punch.done} total={punch.total} />
            <ActionList
              actions={coupon.actions}
              completedIds={completedActionIds}
              disabled={expired || used}
              onToggle={onToggleAction}
            />
          </section>
        ) : null}

        <div className={`code-strip${codeLocked ? " is-locked" : ""}`}>
          <span className="code-label">{codeLocked ? "Locked" : "Code"}</span>
          <code className="code-value">
            {codeLocked ? "••••••••" : coupon.code}
          </code>
        </div>
        {!codeLocked ? (
          <Barcode value={coupon.code} label={coupon.code} />
        ) : null}

        <section className="sheet-terms">
          <h3>Legal line</h3>
          <p>{coupon.terms}</p>
        </section>

        {expired ? <p className="sheet-flag">This ticket has expired.</p> : null}
        {used ? <p className="sheet-flag">Marked used in your wallet.</p> : null}
        {taskDeal && punch.unlocked && !money ? (
          <p className="sheet-flag sheet-flag-ok">Punch card full. Code unlocked.</p>
        ) : null}
        {money && punch.unlocked && taskDeal ? (
          <p className="sheet-flag sheet-flag-ok">Exit path complete. You can wipe your hands.</p>
        ) : null}

        <div className="sheet-actions">
          <button
            type="button"
            className="btn btn-copy"
            onClick={onCopy}
            disabled={codeLocked}
          >
            {codeLocked ? "Code locked" : "Copy code"}
          </button>
          <button
            type="button"
            className="btn btn-clip"
            onClick={onShowRegister}
            disabled={codeLocked}
          >
            Show at register
          </button>
          <button type="button" className="btn btn-clip" onClick={onClip}>
            {clipped ? "Unclip" : "Clip"}
          </button>
          {clipped ? (
            <button type="button" className="btn btn-used" onClick={onToggleUsed}>
              {used ? "Mark unused" : "Mark used"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
