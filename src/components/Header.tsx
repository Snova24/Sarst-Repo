type HeaderProps = {
  walletCount: number;
  savings: string;
  onOpenWallet: () => void;
};

export function Header({ walletCount, savings, onOpenWallet }: HeaderProps) {
  const clippedLabel =
    walletCount === 1 ? "1 ticket clipped" : `${walletCount} tickets clipped`;

  return (
    <header className="masthead">
      <p className="masthead-kicker">Sunday circular · keep what you clip</p>
      <div className="masthead-row">
        <div className="masthead-brand">
          <span className="masthead-clip" aria-hidden="true" />
          <h1 className="wordmark">Clipbook</h1>
        </div>
        <div className="masthead-stats">
          <p className="stat-save">
            <span className="stat-label">Still to save</span>
            <strong className="stat-value">{savings}</strong>
          </p>
          <button
            type="button"
            className="stat-wallet"
            onClick={onOpenWallet}
            aria-label={`${clippedLabel}. Open wallet`}
          >
            <span className="stat-label">Wallet</span>
            <strong className="stat-value">{walletCount}</strong>
          </button>
        </div>
      </div>
    </header>
  );
}
