import { useMemo, type ReactNode } from "react";
import { useProducts } from "./useProducts";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { finalPrice } from "../utils";
import type { CartEntry, CartItem, Product } from "../types";
import { StoreContext, type StoreValue } from "./StoreContext";

export function StoreProvider({ children }: { children: ReactNode }) {
  const { products } = useProducts();
  const [entries, setEntries] = useLocalStorage<CartEntry[]>(
    "kickslam-cart-v3",
    [],
  );
  const [wishlist, setWishlist] = useLocalStorage<number[]>(
    "kickslam-wishlist",
    [],
  );

  const items = useMemo<CartItem[]>(
    () =>
      entries.flatMap((entry) => {
        const product = products.find((p) => p.id === entry.productId);
        return product
          ? [{ product, size: entry.size, quantity: entry.quantity }]
          : [];
      }),
    [entries, products],
  );

  const total = items.reduce(
    (sum, item) => sum + finalPrice(item.product) * item.quantity,
    0,
  );
  const cartCount = entries.reduce((count, e) => count + e.quantity, 0);

  function addToCart(product: Product, size: number) {
    setEntries((current) => {
      const existing = current.find(
        (e) => e.productId === product.id && e.size === size,
      );
      if (existing) {
        return current.map((e) =>
          e.productId === product.id && e.size === size
            ? { ...e, quantity: e.quantity + 1 }
            : e,
        );
      }
      return [...current, { productId: product.id, size, quantity: 1 }];
    });
  }

  function removeFromCart(id: number, size: number) {
    setEntries((current) =>
      current.filter((e) => !(e.productId === id && e.size === size)),
    );
  }

  function changeQuantity(id: number, size: number, change: number) {
    setEntries((current) =>
      current
        .map((e) =>
          e.productId === id && e.size === size
            ? { ...e, quantity: e.quantity + change }
            : e,
        )
        .filter((e) => e.quantity > 0),
    );
  }

  function toggleWishlist(id: number) {
    setWishlist((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );
  }

  const value: StoreValue = {
    items,
    total,
    cartCount,
    wishlist,
    addToCart,
    removeFromCart,
    changeQuantity,
    toggleWishlist,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
