import { createContext } from "react";
import type { CartItem, Product } from "../types";

export type StoreValue = {
  items: CartItem[];
  total: number;
  cartCount: number;
  wishlist: number[];
  addToCart: (product: Product, size: number) => void;
  removeFromCart: (id: number, size: number) => void;
  changeQuantity: (id: number, size: number, change: number) => void;
  toggleWishlist: (id: number) => void;
};

export const StoreContext = createContext<StoreValue | null>(null);
