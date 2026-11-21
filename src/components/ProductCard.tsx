import { Link } from "react-router";
import type { Product } from "../types";
import { finalPrice, formatPrice } from "../utils";

type Props = {
  product: Product;
  wished: boolean;
  onToggleWish: (id: number) => void;
};

function ProductCard({ product, wished, onToggleWish }: Props) {
  const onSale = product.discount > 0;
  const url = `/product/${product.id}`;

  return (
    <div className="card">
      <div className="card-image">
        <button
          className={`wish ${wished ? "wish-on" : ""}`}
          aria-label={
            wished
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={wished}
          onClick={() => onToggleWish(product.id)}
        >
          {wished ? "♥" : "♡"}
        </button>
        <Link to={url} className="card-image-link">
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      <p className="card-brand">{product.brand}</p>
      <h3 className="card-name">
        <Link to={url}>{product.name}</Link>
      </h3>
      <p className="card-price">
        {onSale && (
          <span className="price-old">{formatPrice(product.price)}</span>
        )}
        <span className="price-now">{formatPrice(finalPrice(product))}</span>
        {onSale && (
          <span className="card-discount">{product.discount}% off</span>
        )}
      </p>
      <Link to={url} className="button">
        Select size
      </Link>
    </div>
  );
}

export default ProductCard;
