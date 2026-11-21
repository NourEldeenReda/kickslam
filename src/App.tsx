import { useMemo, useState } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Filters from "./components/Filters";
import { products } from "./data/products";
import {
  defaultFilters,
  filterProducts,
  type Filters as FiltersState,
} from "./utils";
import { useStore } from "./context/useStore";

function App() {
  const {
    items,
    total,
    wishlist,
    addToCart,
    removeFromCart,
    changeQuantity,
    toggleWishlist,
  } = useStore();

  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  const visible = useMemo(() => filterProducts(products, filters), [filters]);
  const shown = showWishlistOnly
    ? visible.filter((p) => wishlist.includes(p.id))
    : visible;

  return (
    <main>
      <h1>Kickslam</h1>
      <Cart
        items={items}
        total={total}
        onChangeQuantity={changeQuantity}
        onRemove={removeFromCart}
      />

      <div className="shop-layout">
        <aside className="sidebar">
          <Filters
            products={products}
            filters={filters}
            onChange={setFilters}
          />
        </aside>

        <section className="shop-main">
          <label className="wish-only">
            <input
              type="checkbox"
              checked={showWishlistOnly}
              onChange={(e) => setShowWishlistOnly(e.target.checked)}
            />
            ♥ Wishlist only ({wishlist.length})
          </label>

          {shown.length === 0 && <p>No shoes match your filters.</p>}
          <div className="grid">
            {shown.map((p) => (
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
    </main>
  );
}

export default App;
