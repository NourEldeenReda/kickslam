import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import { products } from "../data/products";
import {
  defaultFilters,
  filterProducts,
  type Filters as FiltersState,
} from "../utils";
import { useStore } from "../context/useStore";

function ShopPage() {
  const { wishlist, addToCart, toggleWishlist } = useStore();
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const visible = useMemo(() => filterProducts(products, filters), [filters]);

  return (
    <div className="shop-layout">
      <aside className="sidebar">
        <Filters products={products} filters={filters} onChange={setFilters} />
      </aside>

      <section className="shop-main">
        {visible.length === 0 && <p>No shoes match your filters.</p>}
        <div className="grid">
          {visible.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={addToCart}
              wished={wishlist.includes(p.id)}
              onToggleWish={toggleWishlist}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ShopPage;
