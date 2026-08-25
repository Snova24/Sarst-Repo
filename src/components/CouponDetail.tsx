import { useEffect, useRef } from "react";
import type { Coupon } from "../types";
import {
  CATEGORY_LABEL,
  formatDiscount,
  formatExpiry,
  formatMoney,
  isExpired,
} from "../lib/format";

type CouponDetailProps = {
  coupon: Coupon;
  now: Date;
  clipped: boolean;
  used: boolean;
  onClose: () => void;
  onClip: () => void;
  onCopy: () => void;
  onToggleUsed: () => void;
};

export function CouponDetail({
  coupon,
  now,
  clipped,
  used,
  onClose,
  onClip,
  onCopy,
  onToggleUsed,
}: CouponDetailProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const expired = isExpired(coupon.expiresAt, now);
  const titleId = "coupon-detail-title";

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

        <dl className="sheet-meta">
          <div>
            <dt>Expires</dt>
            <dd>{formatExpiry(coupon.expiresAt, now)}</dd>
          </div>
          <div>
            <dt>Min spend</dt>
            <dd>
              {coupon.minSpend != null
                ? formatMoney(coupon.minSpend)
                : "No minimum"}
            </dd>
          </div>
        </dl>

        <div className="code-strip">
          <span className="code-label">Code</span>
          <code className="code-value">{coupon.code}</code>
        </div>

        <section className="sheet-terms">
          <h3>Terms</h3>
          <p>{coupon.terms}</p>
        </section>

        {expired ? <p className="sheet-flag">This ticket has expired.</p> : null}
        {used ? <p className="sheet-flag">Marked used in your wallet.</p> : null}

        <div className="sheet-actions">
          <button type="button" className="btn btn-copy" onClick={onCopy}>
            Copy code
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
