import type { Interest, SortKey } from "../types";
import { INTEREST_GROUPS, INTEREST_LABEL } from "../lib/format";

type ToolbarProps = {
  search: string;
  interest: Interest | "all";
  sort: SortKey;
  onSearch: (value: string) => void;
  onInterest: (value: Interest | "all") => void;
  onSort: (value: SortKey) => void;
};

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "ending", label: "Ending soon" },
  { value: "save", label: "Biggest save" },
  { value: "newest", label: "Newest" },
];

export function Toolbar({
  search,
  interest,
  sort,
  onSearch,
  onInterest,
  onSort,
}: ToolbarProps) {
  return (
    <div className="toolbar">
      <form className="search-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="coupon-search" className="search-label">
          Search
        </label>
        <input
          id="coupon-search"
          type="search"
          className="search-input"
          placeholder="Merchant, code, bonus, or 0% APR"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          autoComplete="off"
        />
      </form>

      <div className="interest-board" role="group" aria-label="Filter by interest">
        <div className="chip-row">
          <p className="chip-row-label">Show</p>
          <div className="chips">
            <button
              type="button"
              className={`chip ${interest === "all" ? "is-active" : ""}`}
              aria-pressed={interest === "all"}
              onClick={() => onInterest("all")}
            >
              All
            </button>
          </div>
        </div>
        {INTEREST_GROUPS.map((group) => (
          <div className="chip-row" key={group.label}>
            <p className="chip-row-label">{group.label}</p>
            <div className="chips">
              {group.items.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`chip${item === "highValue" ? " chip-value" : item === "tasks" ? " chip-tasks" : ""} ${
                    interest === item ? "is-active" : ""
                  }`}
                  aria-pressed={interest === item}
                  onClick={() => onInterest(interest === item ? "all" : item)}
                >
                  {INTEREST_LABEL[item]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="sort-field">
        <label htmlFor="coupon-sort">Sort</label>
        <select
          id="coupon-sort"
          value={sort}
          onChange={(event) => onSort(event.target.value as SortKey)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
