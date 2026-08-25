import { CATEGORIES } from "../types";
import type { Category, SortKey } from "../types";
import { CATEGORY_LABEL } from "../lib/format";

type ToolbarProps = {
  search: string;
  category: Category | "all";
  sort: SortKey;
  onSearch: (value: string) => void;
  onCategory: (value: Category | "all") => void;
  onSort: (value: SortKey) => void;
};

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "ending", label: "Ending soon" },
  { value: "save", label: "Biggest save" },
  { value: "newest", label: "Newest" },
];

export function Toolbar({
  search,
  category,
  sort,
  onSearch,
  onCategory,
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
          placeholder="Merchant, title, or code"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          autoComplete="off"
        />
      </form>

      <div className="chips" role="group" aria-label="Category">
        <button
          type="button"
          className={`chip ${category === "all" ? "is-active" : ""}`}
          aria-pressed={category === "all"}
          onClick={() => onCategory("all")}
        >
          All
        </button>
        {CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${category === item ? "is-active" : ""}`}
            aria-pressed={category === item}
            onClick={() => onCategory(item)}
          >
            {CATEGORY_LABEL[item]}
          </button>
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
