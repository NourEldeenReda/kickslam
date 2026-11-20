import type { CartItem } from "../types";
import { finalPrice, formatPrice } from "../utils";

type Props = {
  items: CartItem[];
  total: number;
  onRemove: (id: number) => void;
};

function Cart({ items, total, onRemove }: Props) {
  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <section className="cart">
      <h2>Your cart</h2>
      <ul>
        {items.map(({ product, quantity }) => (
          <li key={product.id}>
            <span>
              {product.name} × {quantity}
            </span>
            <span>{formatPrice(finalPrice(product) * quantity)}</span>
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
