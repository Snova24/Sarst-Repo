import type { MoneyOffer } from "../types";
import { formatMoney } from "../lib/format";

type MoneyPanelProps = {
  money: MoneyOffer;
};

export function MoneyPanel({ money }: MoneyPanelProps) {
  const kindLabel =
    money.kind === "bankBonus"
      ? "Bank bonus"
      : money.kind === "balanceTransfer"
        ? "0% balance transfer"
        : "0% personal loan";

  return (
    <section className="money-panel">
      <h3>Fine print</h3>
      <p className="money-kind">{kindLabel}</p>

      <div className="safe-exit" role="note">
        <p className="safe-exit-kicker">Safe exit</p>
        <p className="safe-exit-hold">{money.holdMonths}-month horizon</p>
        <p className="safe-exit-copy">{money.safeExit}</p>
        {money.prepayPenalty ? (
          <p className="safe-exit-warn">This one charges a prepay penalty. Read it twice.</p>
        ) : (
          <p className="safe-exit-ok">No prepay penalty. Finishing early is allowed.</p>
        )}
      </div>

      <ol className="money-timeline">
        {money.timeline.map((step) => (
          <li key={`${step.at}-${step.label}`}>
            <span className="money-timeline-at">{step.at}</span>
            <span className="money-timeline-label">{step.label}</span>
          </li>
        ))}
      </ol>

      <dl className="money-facts">
        {money.kind === "bankBonus" ? (
          <div>
            <dt>Claimed bonus</dt>
            <dd>{formatMoney(money.claimed)}</dd>
          </div>
        ) : null}
        {money.introApr ? (
          <div>
            <dt>Intro APR</dt>
            <dd>{money.introApr}</dd>
          </div>
        ) : null}
        {money.thenApr ? (
          <div>
            <dt>Then APR</dt>
            <dd>{money.thenApr}</dd>
          </div>
        ) : null}
        {money.transferFee ? (
          <div>
            <dt>Transfer fee</dt>
            <dd>{money.transferFee}</dd>
          </div>
        ) : null}
        {money.originationFee ? (
          <div>
            <dt>Origination</dt>
            <dd>{money.originationFee}</dd>
          </div>
        ) : null}
        {money.annualFee ? (
          <div>
            <dt>Annual fee</dt>
            <dd>{money.annualFee}</dd>
          </div>
        ) : null}
        {money.monthlyFee ? (
          <div>
            <dt>Monthly fee</dt>
            <dd>{money.monthlyFee}</dd>
          </div>
        ) : null}
      </dl>

      <div className="money-lists">
        <div>
          <h4>To qualify</h4>
          <ul>
            {money.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>How they get you</h4>
          <ul>
            {money.gotchas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
