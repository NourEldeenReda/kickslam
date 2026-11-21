import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { sizesByCategory } from "../data/sizes";
import { useStore } from "../context/useStore";
import { finalPrice, formatPrice } from "../utils";
import type { Product } from "../types";

type Props = {
  product: Product;
  onClose: () => void;
};

function QuickAdd({ product, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { addToCart } = useStore();
  const [size, setSize] = useState<number | null>(null);

  const sizes = sizesByCategory[product.category];
  const onSale = product.discount > 0;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  function handleAdd() {
    if (size === null) return;
    addToCart(product, size);
    onClose();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="quick-add"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="quick-add-body">
        <button
          type="button"
          className="quick-add-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="quick-add-top">
          <img src={product.image} alt={product.name} />
          <div>
            <h2 className="quick-add-title">{product.name}</h2>
            <p className="quick-add-meta">Colour: {product.color}</p>
            <Link to={`/product/${product.id}`} onClick={onClose}>
              See all item details
            </Link>
          </div>
        </div>

        <h3 className="size-heading">Size (EU)</h3>
        <div className="size-grid">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              className={`size ${size === s ? "size-on" : ""}`}
              aria-pressed={size === s}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <p className="card-price">
          {onSale && (
            <span className="price-old">{formatPrice(product.price)}</span>
          )}
          <span className="price-now">{formatPrice(finalPrice(product))}</span>
          {onSale && (
            <span className="card-discount">{product.discount}% off</span>
          )}
        </p>

        <div className="quick-add-actions">
          <button type="button" className="quick-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="quick-confirm"
            disabled={size === null}
            onClick={handleAdd}
          >
            {size === null ? "Select a size" : "Add to cart"}
          </button>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}

export default QuickAdd;
