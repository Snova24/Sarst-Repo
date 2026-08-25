import type { CSSProperties } from "react";
import type { Coupon } from "../types";
import { actionProgress, isActionDeal } from "../lib/coupons";
import {
  CATEGORY_LABEL,
  formatDiscount,
  formatExpiry,
} from "../lib/format";
import { PunchBar } from "./PunchBar";

type FeaturedDealProps = {
  coupon: Coupon;
  now: Date;
  clipped: boolean;
  completedActionIds: string[];
  onOpen: () => void;
  onClip: () => void;
  onCopy: () => void;
};

export function FeaturedDeal({
  coupon,
  now,
  clipped,
  completedActionIds,
  onOpen,
  onClip,
  onCopy,
}: FeaturedDealProps) {
  const punch = actionProgress(coupon, completedActionIds);
  const taskDeal = isActionDeal(coupon);

  return (
    <section
      className="featured"
      style={{ "--accent": coupon.color } as CSSProperties}
      aria-label="Featured deal"
    >
      <p className="featured-ribbon">Featured in this circular</p>
      <div className={`featured-ticket${clipped ? " is-clipped" : ""}`}>
        <button
          type="button"
          className="featured-stub"
          onClick={onOpen}
          tabIndex={-1}
          aria-hidden="true"
        >
          <span className="featured-discount">
            {formatDiscount(coupon.discount)}
          </span>
          <span className="stamp stamp-on-dark">
            {CATEGORY_LABEL[coupon.category]}
          </span>
        </button>
        <div className="ticket-gutter featured-gutter" aria-hidden="true">
          <span className="punch punch-top" />
          <span className="punch punch-mid" />
          <span className="punch punch-bottom" />
        </div>
        <button
          type="button"
          className="featured-copy"
          onClick={onOpen}
          aria-label={`${coupon.merchant}, ${coupon.title}. View details`}
        >
          <span className="featured-merchant">{coupon.merchant}</span>
          <span className="featured-tagline">{coupon.merchantTagline}</span>
          <span className="featured-title">{coupon.title}</span>
          <span className="featured-expiry">
            {formatExpiry(coupon.expiresAt, now)}
          </span>
          {taskDeal ? (
            <PunchBar done={punch.done} total={punch.total} compact />
          ) : null}
        </button>
        <div className="ticket-actions featured-actions">
          <button type="button" className="btn btn-clip" onClick={onClip}>
            {clipped ? "Unclip" : "Clip"}
          </button>
          {taskDeal && !punch.unlocked ? (
            <button type="button" className="btn btn-copy" onClick={onOpen}>
              Earn code
            </button>
          ) : (
            <button type="button" className="btn btn-copy" onClick={onCopy}>
              Copy code
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
