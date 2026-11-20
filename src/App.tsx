import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import type { Product, CartItem } from "./types";
import { products } from "./data/products";
import { finalPrice } from "./utils";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

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
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </main>
  );
}

export default App;
