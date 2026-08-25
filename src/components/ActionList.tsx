import type { CouponAction } from "../types";

type ActionListProps = {
  actions: CouponAction[];
  completedIds: string[];
  disabled?: boolean;
  onToggle: (actionId: string) => void;
};

export function ActionList({
  actions,
  completedIds,
  disabled = false,
  onToggle,
}: ActionListProps) {
  return (
    <ul className="action-list">
      {actions.map((action) => {
        const done = completedIds.includes(action.id);
        return (
          <li key={action.id}>
            <button
              type="button"
              className={`action-row${done ? " is-done" : ""}`}
              aria-pressed={done}
              disabled={disabled}
              onClick={() => onToggle(action.id)}
            >
              <span className="action-box" aria-hidden="true">
                {done ? "✓" : ""}
              </span>
              <span className="action-copy">
                <span className="action-label">{action.label}</span>
                {action.hint ? <span className="action-hint">{action.hint}</span> : null}
              </span>
              <span className="action-cta">{done ? "Undo" : "I did this"}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
