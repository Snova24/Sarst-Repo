import { formatMiles, type Coords } from "../lib/geo";
import type { NearbyReminder } from "../lib/club";
import type { GeoStatus } from "../lib/location";

type NearbyRemindersProps = {
  rows: NearbyReminder[];
  onOpenCoupon: (id: string) => void;
  onShowPass: (value: string, merchant: string, title: string, hint: string) => void;
  onScan: () => void;
};

type ClubPinBarProps = {
  enrolledCount: number;
  coords: Coords | null;
  geoStatus: GeoStatus;
  geoSource: "gps" | "tideglass" | null;
  onRequestGps: () => void;
  onUseTideglass: () => void;
  onClearGeo: () => void;
  onScan: () => void;
};

export function NearbyReminders({
  rows,
  onOpenCoupon,
  onShowPass,
  onScan,
}: NearbyRemindersProps) {
  if (!rows.length) return null;
  return (
    <aside className="reminders" aria-label="Membership reminders nearby">
      <p className="reminders-kicker">You are near a club</p>
      {rows.map(({ club, miles, coupons }) => (
        <div key={club.id} className="reminder-card">
          <p className="reminder-place">
            {formatMiles(miles)} · {club.place.label}
          </p>
          <p className="reminder-copy">
            {club.name}: {club.perk}
          </p>
          <div className="reminder-actions">
            <button
              type="button"
              className="btn btn-clip"
              onClick={() =>
                onShowPass(
                  club.memberNumber,
                  club.merchant,
                  club.name,
                  "Scan this membership barcode first, then the offer if they need it.",
                )
              }
            >
              Flash club card
            </button>
            {coupons[0] ? (
              <button type="button" className="btn btn-copy" onClick={() => onOpenCoupon(coupons[0].id)}>
                Open {coupons[0].code}
              </button>
            ) : null}
            <button type="button" className="btn" onClick={onScan}>
              Scan shelf tag
            </button>
          </div>
        </div>
      ))}
    </aside>
  );
}

export function ClubPinBar({
  enrolledCount,
  coords,
  geoStatus,
  geoSource,
  onRequestGps,
  onUseTideglass,
  onClearGeo,
  onScan,
}: ClubPinBarProps) {
  const pinLabel =
    geoSource === "tideglass"
      ? "Using the Tideglass pin."
      : geoSource === "gps"
        ? "Using GPS."
        : geoStatus === "pending"
          ? "Asking for GPS…"
          : geoStatus === "denied"
            ? "GPS blocked — pin Tideglass instead."
            : geoStatus === "error"
              ? "GPS failed — pin Tideglass instead."
              : enrolledCount > 0
                ? `You're in ${enrolledCount === 1 ? "1 club" : `${enrolledCount} clubs`}. Pin Tideglass so Clipbook can nag you at the door.`
                : "Pin Tideglass or allow GPS. Nearby clubs will remind you what to scan.";

  return (
    <div className="club-pin">
      <p>{pinLabel}</p>
      <div className="club-pin-actions">
        <button type="button" className="btn btn-clip" onClick={onUseTideglass}>
          Pin Tideglass
        </button>
        <button type="button" className="btn btn-copy" onClick={onRequestGps}>
          Use GPS
        </button>
        {coords ? (
          <button type="button" className="btn" onClick={onClearGeo}>
            Clear pin
          </button>
        ) : null}
        <button type="button" className="btn" onClick={onScan}>
          Scan barcode
        </button>
      </div>
    </div>
  );
}
