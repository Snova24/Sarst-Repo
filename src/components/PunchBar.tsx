type PunchBarProps = {
  done: number;
  total: number;
  compact?: boolean;
};

export function PunchBar({ done, total, compact = false }: PunchBarProps) {
  if (total <= 0) return null;
  const ratio = Math.min(1, done / total);
  const label = done === total ? "Code unlocked" : `${done} of ${total} stamped`;

  return (
    <div
      className={`punch-bar${compact ? " is-compact" : ""}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
      aria-label={label}
    >
      <div className="punch-bar-track">
        <div className="punch-bar-fill" style={{ width: `${ratio * 100}%` }} />
      </div>
      <ol className="punch-stamps" aria-hidden="true">
        {Array.from({ length: total }, (_, index) => (
          <li
            key={index}
            className={index < done ? "is-stamped" : undefined}
          />
        ))}
      </ol>
      <p className="punch-bar-label">{label}</p>
    </div>
  );
}
