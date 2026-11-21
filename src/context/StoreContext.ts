import { createContext } from "react";
import type { CartItem, Product } from "../types";

export type StoreValue = {
  items: CartItem[];
  total: number;
  cartCount: number;
  wishlist: number[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  changeQuantity: (id: number, change: number) => void;
  toggleWishlist: (id: number) => void;
};

export const StoreContext = createContext<StoreValue | null>(null);
