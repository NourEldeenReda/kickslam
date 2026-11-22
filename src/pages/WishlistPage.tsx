import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/useProducts";
import { useStore } from "../context/useStore";

function WishlistPage() {
  const { wishlist, toggleWishlist } = useStore();
  const { products, loading } = useProducts();
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <section>
      <h1 className="page-title">Your wishlist</h1>
      {loading ? (
        <p>Loading your favourites...</p>
      ) : saved.length === 0 ? (
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
