import { Link } from "react-router";
import type { CartItem } from "../types";
import { finalPrice, formatPrice } from "../utils";

type Props = {
  items: CartItem[];
  total: number;
  onChangeQuantity: (id: number, size: number, change: number) => void;
  onRemove: (id: number, size: number) => void;
};

function Cart({ items, total, onChangeQuantity, onRemove }: Props) {
  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <section className="cart">
      <ul>
        {items.map(({ product, size, quantity }) => (
          <li key={`${product.id}-${size}`}>
            <Link to={`/product/${product.id}`} className="cart-thumb">
              <img src={product.image} alt={product.name} />
            </Link>

            <span className="cart-name">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
              <small className="cart-size">Size {size}</small>
            </span>

            <div className="qty">
              <button
                aria-label={`Decrease ${product.name} size ${size}`}
                onClick={() => onChangeQuantity(product.id, size, -1)}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                aria-label={`Increase ${product.name} size ${size}`}
                onClick={() => onChangeQuantity(product.id, size, 1)}
              >
                +
              </button>
            </div>

            <span className="cart-line-price">
              {formatPrice(finalPrice(product) * quantity)}
            </span>

            <button
              className="remove"
              onClick={() => onRemove(product.id, size)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: {formatPrice(total)}</p>
    </section>
  );
}

export default Cart;
