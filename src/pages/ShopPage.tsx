import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Hero from "../components/Hero";
import {
  defaultFilters,
  filterProducts,
  type Filters as FiltersState,
} from "../utils";
import { useStore } from "../context/useStore";
import { useProducts } from "../context/useProducts";

function ShopPage() {
  const { wishlist, toggleWishlist } = useStore();
  const { products, loading, error, reload } = useProducts();
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const visible = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    (filters.minPrice !== null ? 1 : 0) +
    (filters.maxPrice !== null ? 1 : 0) +
    (filters.sort !== "default" ? 1 : 0) +
    (filters.search.trim() ? 1 : 0);

  return (
    <>
      <Hero />
      <div className="shop-layout" id="shoes">
        <button
          type="button"
          className="filters-toggle"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((open) => !open)}
        >
          {filtersOpen ? "Hide filters" : "Filters"}
          {activeCount > 0 && ` (${activeCount})`}
        </button>

        <aside className={`sidebar ${filtersOpen ? "sidebar-open" : ""}`}>
          <Filters
            products={products}
            filters={filters}
            onChange={setFilters}
          />
        </aside>

        <section className="shop-main">
          {loading ? (
            <div className="grid" aria-busy="true" aria-label="Loading shoes">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="card skeleton" />
              ))}
            </div>
          ) : error ? (
            <div className="notice" role="alert">
              <p>Couldn't load the shoes: {error}</p>
              <button type="button" onClick={reload}>
                Try again
              </button>
            </div>
          ) : (
            <>
              {visible.length === 0 && <p>No shoes match your filters.</p>}
              <div className="grid">
                {visible.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    wished={wishlist.includes(p.id)}
                    onToggleWish={toggleWishlist}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default ShopPage;
