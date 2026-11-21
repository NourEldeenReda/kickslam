import { useMemo, useState } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import type { Product, CartItem } from "./types";
import { products } from "./data/products";
import {
  defaultFilters,
  filterProducts,
  finalPrice,
  type Filters as FiltersState,
} from "./utils";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Filters from "./components/Filters";

function App() {
  const [cart, setCart] = useLocalStorage<CartItem[]>("kickslam-cart", []);
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);
  const [wishlist, setWishlist] = useLocalStorage<number[]>(
    "kickslam-wishlist",
    [],
  );
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const visible = useMemo(() => filterProducts(products, filters), [filters]);
  const shown = showWishlistOnly
    ? visible.filter((p) => wishlist.includes(p.id))
    : visible;

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }
  function toggleWishlist(id: number) {
    setWishlist((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  }
  function removeFromCart(id: number) {
    setCart((current) => current.filter((item) => item.product.id !== id));
  }

  function changeQuantity(id: number, change: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + finalPrice(item.product) * item.quantity,
    0,
  );

  return (
    <main>
      <h1>Kickslam</h1>
      <Cart
        items={cart}
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
