import type { Product } from "../types";
import { defaultFilters, unique, type Filters as FiltersState } from "../utils";

type Props = {
  products: Product[];
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
};

function toggle(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

function toNumberOrNull(value: string): number | null {
  return value === "" ? null : Number(value);
}

function Filters({ products, filters, onChange }: Props) {
  const categories = unique(products, "category") as string[];
  const brands = unique(products, "brand") as string[];
  const colors = unique(products, "color") as string[];

  function renderGroup(
    title: string,
    options: string[],
    selected: string[],
    key: "categories" | "brands" | "colors",
  ) {
    return (
      <fieldset className="filter-group">
        <legend>{title}</legend>
        {options.map((option) => (
          <label key={option} className="filter-option">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() =>
                onChange({ ...filters, [key]: toggle(selected, option) })
              }
            />
            {option}
          </label>
        ))}
      </fieldset>
    );
  }

  return (
    <section className="filters">
      <input
        type="search"
        className="filter-search"
        placeholder="Search by name or brand..."
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />

      <div className="filter-row">
        {renderGroup("Category", categories, filters.categories, "categories")}
        {renderGroup("Brand", brands, filters.brands, "brands")}
        {renderGroup("Colour", colors, filters.colors, "colors")}

        <fieldset className="filter-group">
          <legend>Price</legend>
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={filters.minPrice ?? ""}
            onChange={(e) =>
              onChange({ ...filters, minPrice: toNumberOrNull(e.target.value) })
            }
          />
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: toNumberOrNull(e.target.value) })
            }
          />
        </fieldset>

        <fieldset className="filter-group two-col">
          <legend>Sort</legend>
          <select
            value={filters.sort}
            onChange={(e) =>
              onChange({
                ...filters,
                sort: e.target.value as FiltersState["sort"],
              })
            }
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </fieldset>
      </div>

      <button className="filter-reset" onClick={() => onChange(defaultFilters)}>
        Reset filters
      </button>
    </section>
  );
}

export default Filters;
