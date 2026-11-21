import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useStore } from "../context/useStore";

function WishlistPage() {
  const { wishlist, addToCart, toggleWishlist } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <section>
      <h1 className="page-title">Your wishlist</h1>
      {saved.length === 0 ? (
        <p>
          No favourites yet. <Link to="/">Browse the shop</Link> and tap the
          heart on a shoe.
        </p>
      ) : (
        <div className="grid">
          {saved.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={addToCart}
              wished
              onToggleWish={toggleWishlist}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default WishlistPage;
