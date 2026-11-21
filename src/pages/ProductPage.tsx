import { useState } from "react";
import { Link, useParams } from "react-router";
import { products } from "../data/products";
import { sizesByCategory } from "../data/sizes";
import { finalPrice, formatPrice } from "../utils";
import { useStore } from "../context/useStore";

function ProductPage() {
  const { id } = useParams();
  const { wishlist, addToCart, toggleWishlist } = useStore();
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <p>
        Shoe not found. <Link to="/">Back to the shop</Link>
      </p>
    );
  }

  const sizes = sizesByCategory[product.category];
  const onSale = product.discount > 0;
  const wished = wishlist.includes(product.id);

  function chooseSize(s: number) {
    setSize(s);
    setAdded(false);
  }

  function handleAdd() {
    if (size === null || !product) return;
    addToCart(product, size);
    setAdded(true);
  }

  return (
    <section className="product-page">
      <Link to="/" className="back-link">
        ← Back to the shop
      </Link>

      <div className="product-detail">
        <div className="product-photo">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <p className="card-brand">{product.brand}</p>
          <h1 className="product-title">{product.name}</h1>

          <p className="card-price">
            {onSale && (
              <span className="price-old">{formatPrice(product.price)}</span>
            )}
            <span className="price-now">
              {formatPrice(finalPrice(product))}
            </span>
            {onSale && (
              <span className="card-discount">{product.discount}% off</span>
            )}
          </p>

          <p className="product-meta">
            Colour: {product.color} · Category: {product.category}
          </p>

          <h2 className="size-heading">Select size (EU)</h2>
          <div className="size-grid">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                className={`size ${size === s ? "size-on" : ""}`}
                aria-pressed={size === s}
                onClick={() => chooseSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            className="add-btn"
            disabled={size === null}
            onClick={handleAdd}
          >
            {size === null ? "Select a size" : "Add to cart"}
          </button>

          {added && (
            <p className="added-note" role="status">
              Added to cart. <Link to="/cart">View cart</Link>
            </p>
          )}

          <button
            className="wish-btn"
            onClick={() => toggleWishlist(product.id)}
          >
            {wished ? "♥ Saved to wishlist" : "♡ Add to wishlist"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
