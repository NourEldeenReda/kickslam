export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
