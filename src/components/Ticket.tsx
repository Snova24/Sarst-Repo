import type { CSSProperties } from "react";
import type { Coupon } from "../types";
import { actionProgress, isActionDeal, locksCode } from "../lib/coupons";
import {
  CATEGORY_LABEL,
  MONEY_KIND_LABEL,
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
  const money = coupon.money;
  const codeLocked = locksCode(coupon) && !punch.unlocked;
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
        {money ? (
          <span className="stamp stamp-money">{MONEY_KIND_LABEL[money.kind]}</span>
        ) : null}
        {taskDeal && !money ? <span className="stamp stamp-punch">Punch</span> : null}
        {used ? (
          <span className="rubber-mark rubber-used">Used</span>
        ) : expired ? (
          <span className="rubber-mark rubber-expired">Expired</span>
        ) : null}
        <span className="ticket-merchant">{coupon.merchant}</span>
        <span className="ticket-title">{coupon.title}</span>
        <span className="ticket-expiry">{formatExpiry(coupon.expiresAt, now)}</span>
        {money ? (
          <span className="ticket-exit">Clean exit · {money.holdMonths} months</span>
        ) : null}
        {taskDeal ? (
          <PunchBar done={punch.done} total={punch.total} compact />
        ) : null}
      </button>
      <div className="ticket-actions">
        <button type="button" className="btn btn-clip" onClick={onClip}>
          {clipped ? "Unclip" : "Clip"}
        </button>
        {codeLocked ? (
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
