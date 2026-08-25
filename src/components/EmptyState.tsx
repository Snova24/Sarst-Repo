type EmptyStateProps = {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  body,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="empty">
      <div className="empty-ticket" aria-hidden="true">
        <span className="empty-hole" />
        <span className="empty-hole" />
      </div>
      <h2 className="empty-title">{title}</h2>
      <p className="empty-body">{body}</p>
      {actionLabel && onAction ? (
        <button type="button" className="btn btn-clip" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
