import type { Product } from "../types";
import { finalPrice, formatPrice } from "../utils";

type Props = {
  product: Product;
  onAdd: (product: Product) => void;
};

function ProductCard({ product, onAdd }: Props) {
  const onSale = product.discount > 0;

  return (
    <div className="card">
      <div className="card-image">
        <img src={product.image} alt={product.name} />
      </div>
      <p className="card-brand">{product.brand}</p>
      <h3 className="card-name">{product.name}</h3>
      <p className="card-price">
        {onSale && (
          <span className="price-old">{formatPrice(product.price)}</span>
        )}
        <span className="price-now">{formatPrice(finalPrice(product))}</span>
        {onSale && (
          <span className="card-discount">{product.discount}% off</span>
        )}
      </p>
      <button onClick={() => onAdd(product)}>Add to cart</button>
    </div>
  );
}

export default ProductCard;
