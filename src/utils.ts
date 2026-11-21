import type { Product } from "./types";

export function finalPrice(product: Product): number {
  return Math.round(product.price * (100 - product.discount)) / 100;
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export const unique = <K extends keyof Product>(items: Product[], key: K) =>
  Array.from(new Set(items.map((p) => p[key]))).sort() as Product[K][];

export type Filters = {
  search: string;
  categories: string[];
  brands: string[];
  colors: string[];
  minPrice: number | null;
  maxPrice: number | null;
  sort: "default" | "price-asc" | "price-desc";
};

export const defaultFilters: Filters = {
  search: "",
  categories: [],
  brands: [],
  colors: [],
  minPrice: null,
  maxPrice: null,
  sort: "default",
};

export function filterProducts(products: Product[], f: Filters): Product[] {
  const q = f.search.trim().toLowerCase();

  const result = products.filter((p) => {
    const price = finalPrice(p);
    if (q && !`${p.name} ${p.brand}`.toLowerCase().includes(q)) return false;
    if (f.categories.length && !f.categories.includes(p.category)) return false;
    if (f.brands.length && !f.brands.includes(p.brand)) return false;
    if (f.colors.length && !f.colors.includes(p.color)) return false;
    if (f.minPrice !== null && price < f.minPrice) return false;
    if (f.maxPrice !== null && price > f.maxPrice) return false;
    return true;
  });

  if (f.sort === "price-asc")
    result.sort((a, b) => finalPrice(a) - finalPrice(b));
  if (f.sort === "price-desc")
    result.sort((a, b) => finalPrice(b) - finalPrice(a));

  return result;
}
