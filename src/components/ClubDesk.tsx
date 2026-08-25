import type { CSSProperties } from "react";
import { MEMBERSHIPS } from "../data/memberships";
import { liveClubCoupons } from "../lib/club";
import { Barcode } from "./Barcode";

type ClubDeskProps = {
  enrolledIds: string[];
  now: Date;
  onJoin: (id: string) => void;
  onLeave: (id: string) => void;
  onShowPass: (value: string, merchant: string, title: string, hint: string) => void;
  onOpenCoupon: (id: string) => void;
  onScan: () => void;
};

export function ClubDesk({
  enrolledIds,
  now,
  onJoin,
  onLeave,
  onShowPass,
  onOpenCoupon,
  onScan,
}: ClubDeskProps) {
  return (
    <section className="club-desk">
      <header className="deal-section-head">
        <p className="deal-section-kicker">Membership collection</p>
        <h2 className="deal-section-title">Your clubs</h2>
        <p className="deal-section-lede">
          Join a merchant club. When GPS or a Tideglass pin says you are next to
          the store, Clipbook reminds you what that membership is good for — then
          you flash the barcode at the register.
        </p>
        <button type="button" className="btn btn-copy club-scan" onClick={onScan}>
          Scan at the register
        </button>
      </header>
      <div className="club-grid">
        {MEMBERSHIPS.map((club) => {
          const inClub = enrolledIds.includes(club.id);
          const live = liveClubCoupons(club, now);
          return (
            <article
              key={club.id}
              className={`club-card${inClub ? " is-in" : ""}`}
              style={{ "--accent": club.color } as CSSProperties}
            >
              <p className="club-name">{club.name}</p>
              <p className="club-merchant">{club.merchant}</p>
              <p className="club-perk">{club.perk}</p>
              {inClub ? <Barcode value={club.memberNumber} label={club.memberNumber} /> : null}
              <ul className="club-perks">
                {live.map((coupon) => (
                  <li key={coupon.id}>
                    <button type="button" className="club-link" onClick={() => onOpenCoupon(coupon.id)}>
                      {coupon.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="club-actions">
                {inClub ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-clip"
                      onClick={() =>
                        onShowPass(
                          club.memberNumber,
                          club.merchant,
                          club.name,
                          "Hold the barcode under the register scanner. Then open a live clip if they ask for the offer code.",
                        )
                      }
                    >
                      Show at register
                    </button>
                    <button type="button" className="btn" onClick={() => onLeave(club.id)}>
                      Leave club
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-clip"
                    data-testid={`join-${club.id}`}
                    onClick={() => onJoin(club.id)}
                  >
                    Join
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
