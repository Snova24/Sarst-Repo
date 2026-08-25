import type { ReactNode } from "react";

type TicketGridProps = {
  children: ReactNode;
};

export function TicketGrid({ children }: TicketGridProps) {
  return <div className="ticket-grid">{children}</div>;
}
