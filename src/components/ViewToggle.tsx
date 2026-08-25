export type AppView = "browse" | "wallet";

type ViewToggleProps = {
  view: AppView;
  onChange: (view: AppView) => void;
};

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="view-toggle" role="tablist" aria-label="Booklet view">
      <button
        type="button"
        role="tab"
        id="tab-browse"
        aria-selected={view === "browse"}
        aria-controls="panel-deals"
        className={view === "browse" ? "is-active" : ""}
        onClick={() => onChange("browse")}
      >
        Browse
      </button>
      <button
        type="button"
        role="tab"
        id="tab-wallet"
        aria-selected={view === "wallet"}
        aria-controls="panel-deals"
        className={view === "wallet" ? "is-active" : ""}
        onClick={() => onChange("wallet")}
      >
        Wallet
      </button>
    </div>
  );
}
