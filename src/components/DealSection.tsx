import type { ReactNode } from "react";

type DealSectionProps = {
  kicker: string;
  title: string;
  lede: string;
  children: ReactNode;
};

export function DealSection({ kicker, title, lede, children }: DealSectionProps) {
  return (
    <section className="deal-section">
      <header className="deal-section-head">
        <p className="deal-section-kicker">{kicker}</p>
        <h2 className="deal-section-title">{title}</h2>
        <p className="deal-section-lede">{lede}</p>
      </header>
      {children}
    </section>
  );
}
