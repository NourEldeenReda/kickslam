import { Link } from "react-router";
import Cart from "../components/Cart";
import { useStore } from "../context/useStore";

function CartPage() {
  const { items, total, changeQuantity, removeFromCart } = useStore();

  return (
    <section>
      <h1 className="page-title">Your cart</h1>
      <Cart
        items={items}
        total={total}
        onChangeQuantity={changeQuantity}
        onRemove={removeFromCart}
      />
      <Link to="/">← Continue shopping</Link>
    </section>
  );
}

export default CartPage;
