import { createContext } from "react";
import type { Product } from "../types";

export type ProductsValue = {
  products: Product[];
  loading: boolean;
  error: string | null;
  reload: () => void;
};

export const ProductsContext = createContext<ProductsValue | null>(null);
