export type Category = "sneakers" | "sandal" | "flats" | "heels";

export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  discount: number;
  color: string;
  category: Category;
  image: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
