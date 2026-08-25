import type { CSSProperties } from "react";
import type { Coupon } from "../types";
import { actionProgress, isActionDeal } from "../lib/coupons";
import {
  CATEGORY_LABEL,
  formatDiscount,
  formatExpiry,
  isExpired,
} from "../lib/format";
import { PunchBar } from "./PunchBar";

type TicketProps = {
  coupon: Coupon;
  now: Date;
  clipped: boolean;
  used: boolean;
  completedActionIds: string[];
  onOpen: () => void;
  onClip: () => void;
  onCopy: () => void;
};

export function Ticket({
  coupon,
  now,
  clipped,
  used,
  completedActionIds,
  onOpen,
  onClip,
  onCopy,
}: TicketProps) {
  const expired = isExpired(coupon.expiresAt, now);
  const punch = actionProgress(coupon, completedActionIds);
  const taskDeal = isActionDeal(coupon);
  const classes = [
    "ticket",
    expired ? "is-expired" : "",
    used ? "is-used" : "",
    clipped ? "is-clipped" : "",
    taskDeal ? "is-punch" : "",
    punch.unlocked && taskDeal ? "is-unlocked" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={classes}
      style={{ "--accent": coupon.color } as CSSProperties}
    >
      <button
        type="button"
        className="ticket-stub"
        onClick={onOpen}
        tabIndex={-1}
        aria-hidden="true"
      >
        <span className="ticket-discount">{formatDiscount(coupon.discount)}</span>
      </button>
      <div className="ticket-gutter" aria-hidden="true">
        <span className="punch punch-top" />
        <span className="punch punch-bottom" />
      </div>
      <button
        type="button"
        className="ticket-copy"
        onClick={onOpen}
        aria-label={`${coupon.merchant}, ${coupon.title}. View details`}
      >
        <span className="stamp">{CATEGORY_LABEL[coupon.category]}</span>
        {taskDeal ? <span className="stamp stamp-punch">Punch</span> : null}
        {used ? (
          <span className="rubber-mark rubber-used">Used</span>
        ) : expired ? (
          <span className="rubber-mark rubber-expired">Expired</span>
        ) : null}
        <span className="ticket-merchant">{coupon.merchant}</span>
        <span className="ticket-title">{coupon.title}</span>
        <span className="ticket-expiry">{formatExpiry(coupon.expiresAt, now)}</span>
        {taskDeal ? (
          <PunchBar done={punch.done} total={punch.total} compact />
        ) : null}
      </button>
      <div className="ticket-actions">
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
    </article>
  );
}
