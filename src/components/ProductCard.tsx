import type { Product } from "../types";

type Props = {
  product: Product;
  onAdd: (product: Product) => void;
};

function ProductCard({ product, onAdd }: Props) {
  return (
    <div className="card">
      <div className="card-image">👟</div>
      <p className="card-brand">{product.brand}</p>
      <h3 className="card-name">{product.name}</h3>
      <p className="card-price">${product.price}</p>
      <button onClick={() => onAdd(product)}>Add to cart</button>
    </div>
  );
}

export default ProductCard;
