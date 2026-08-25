import { useState } from "react";
import type { Coupon } from "../types";
import { analyzeDeal, type WorthReport } from "../lib/intel";
import { formatMiles } from "../lib/geo";
import type { Coords } from "../lib/geo";
import { formatMoney } from "../lib/format";
import type { GeoStatus } from "../lib/location";

type WorthItProps = {
  coupon: Coupon;
  here: Coords | null;
  geoStatus: GeoStatus;
  geoSource: "gps" | "tideglass" | null;
  onRequestGps: () => void;
  onUseTideglass: () => void;
  onClearGeo: () => void;
};

const VERDICT_LABEL: Record<WorthReport["verdict"], string> = {
  worth: "Worth it",
  borderline: "Borderline",
  skip: "Skip",
};

const LEGIT_LABEL: Record<WorthReport["priceLegit"], string> = {
  legit: "Discount checks out vs archive",
  inflated: "Was-price looks inflated",
  "always-on": "Archive says this is the usual price",
  unknown: "No archive capture yet",
};

export function WorthIt({
  coupon,
  here,
  geoStatus,
  geoSource,
  onRequestGps,
  onUseTideglass,
  onClearGeo,
}: WorthItProps) {
  const [mode, setMode] = useState<"simple" | "detailed">("simple");
  const report = analyzeDeal(coupon, here);

  return (
    <section className={`worth ${report.verdict}`}>
      <div className="worth-head">
        <p className={`worth-verdict is-${report.verdict}`}>{VERDICT_LABEL[report.verdict]}</p>
        <div className="worth-toggle" role="group" aria-label="Terms layout">
          <button
            type="button"
            className={mode === "simple" ? "is-active" : ""}
            aria-pressed={mode === "simple"}
            onClick={() => setMode("simple")}
          >
            Simple
          </button>
          <button
            type="button"
            className={mode === "detailed" ? "is-active" : ""}
            aria-pressed={mode === "detailed"}
            onClick={() => setMode("detailed")}
          >
            Detailed
          </button>
        </div>
      </div>
      <p className="worth-headline">{report.headline}</p>
      <p className="worth-legit">{LEGIT_LABEL[report.priceLegit]}</p>

      <dl className="worth-math">
        <div>
          <dt>Claimed</dt>
          <dd>{formatMoney(report.claimed)}</dd>
        </div>
        <div>
          <dt>Fees / drag</dt>
          <dd>{report.fees ? `−${formatMoney(report.fees)}` : "None"}</dd>
        </div>
        <div>
          <dt>Net</dt>
          <dd>{formatMoney(report.net)}</dd>
        </div>
        <div>
          <dt>$ / hour</dt>
          <dd>
            {report.dollarsPerHour != null ? formatMoney(report.dollarsPerHour) : "—"}
          </dd>
        </div>
      </dl>

      <div className="worth-geo">
        <p>
          {report.online
            ? "Online deal — GPS is optional."
            : report.miles != null
              ? `${formatMiles(report.miles)} from ${report.placeLabel}${report.nearby ? " · in range" : " · a haul"}`
              : `In-store at ${report.placeLabel}. Use GPS or pin Tideglass.`}
        </p>
        <div className="worth-geo-actions">
          <button type="button" className="btn btn-copy" onClick={onRequestGps} disabled={geoStatus === "pending"}>
            {geoStatus === "pending" ? "Reading GPS…" : geoSource === "gps" ? "Refresh GPS" : "Use GPS"}
          </button>
          <button type="button" className="btn" onClick={onUseTideglass}>
            Pin Tideglass
          </button>
          {here ? (
            <button type="button" className="btn" onClick={onClearGeo}>
              Clear pin
            </button>
          ) : null}
        </div>
        {geoStatus === "denied" ? (
          <p className="worth-geo-note">GPS blocked in this browser. Pin Tideglass to estimate a drive.</p>
        ) : null}
      </div>

      {mode === "simple" ? (
        <ul className="worth-simple">
          {report.simpleTerms.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : (
        <div className="worth-detailed">
          <h4>The math</h4>
          <ul>
            {report.mathLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {report.intel.archive.length > 0 ? (
            <>
              <h4>Price file (shelf, web, archive)</h4>
              <table className="worth-archive">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Price</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {report.intel.archive.map((row) => (
                    <tr key={`${row.at}-${row.price}-${row.source}`}>
                      <td>{row.at}</td>
                      <td>{formatMoney(row.price)}</td>
                      <td>
                        {row.source}
                        {row.note ? ` — ${row.note}` : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="worth-geo-note">
              No Wayback/web capture on file for this merchant yet. Math still runs on the stated terms and fees.
            </p>
          )}
          <h4>Full terms</h4>
          <ul>
            {report.detailedTerms.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
