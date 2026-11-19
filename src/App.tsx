import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import type { Product, CartItem } from "./types";

const products: Product[] = [
  { id: 1, name: "Air Monarch", brand: "Nike", price: 120 },
  { id: 2, name: "Superstar", brand: "Adidas", price: 100 },
  { id: 3, name: "Suede Classic", brand: "Puma", price: 90 },
];

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

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <main>
      <h1>Kickslam</h1>
      <Cart items={cart} total={total} onRemove={removeFromCart} />
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </main>
  );
}

export default App;
