import type { Product } from "./types";

export function finalPrice(product: Product): number {
  return Math.round(product.price * (100 - product.discount)) / 100;
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
