import type { CartItem } from "../types";
import { finalPrice, formatPrice } from "../utils";

type Props = {
  items: CartItem[];
  total: number;
  onChangeQuantity: (id: number, change: number) => void;
  onRemove: (id: number) => void;
};

function Cart({ items, total, onChangeQuantity, onRemove }: Props) {
  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <section className="cart">
      <h2>Your cart</h2>
      <ul>
        {items.map(({ product, quantity }) => (
          <li key={product.id}>
            <span>{product.name}</span>

            <div className="qty">
              <button
                aria-label={`Decrease ${product.name}`}
                onClick={() => onChangeQuantity(product.id, -1)}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                aria-label={`Increase ${product.name}`}
                onClick={() => onChangeQuantity(product.id, 1)}
              >
                +
              </button>
            </div>

            <span className="cart-line-price">
              {formatPrice(finalPrice(product) * quantity)}
            </span>

            <button className="remove" onClick={() => onRemove(product.id)}>
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
