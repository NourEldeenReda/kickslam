import { Link } from "react-router";
import { useProducts } from "../context/useProducts";
import { finalPrice, formatPrice } from "../utils";

function Hero() {
  const { products } = useProducts();
  const featured =
    products.length > 0
      ? products.reduce((best, p) => (p.discount > best.discount ? p : best))
      : null;

  return (
    <section className="hero">
      <div className="hero-text">
        <p className="hero-eyebrow">New season sale</p>
        <h1>Find your next pair</h1>
        <p className="hero-sub">
          {featured
            ? `Sneakers, flats and heels, with up to ${featured.discount}% off right now.`
            : "Sneakers, flats and heels, with new deals every week."}
        </p>
        <a href="#shoes" className="hero-cta">
          Shop the collection
        </a>
      </div>

      {featured && (
        <Link to={`/product/${featured.id}`} className="hero-feature">
          <img src={featured.image} alt={featured.name} />
          <span className="hero-tag">Top deal · {featured.discount}% off</span>
          <strong>{featured.name}</strong>
          <span>
            {formatPrice(finalPrice(featured))}{" "}
            <s className="hero-old">{formatPrice(featured.price)}</s>
          </span>
        </Link>
      )}
    </section>
  );
}

export default Hero;
