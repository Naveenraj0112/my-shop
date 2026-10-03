import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">

      <Link
        to={`/products/${product.id}`}
        className="product-link"
      >
        <img
          src={product.image}
          alt={product.name}
        />

        <h3>{product.name}</h3>
      </Link>

      <p className="description">
        {product.description}
      </p>

      <p className="rating">
        ⭐ {product.rating} / 5
      </p>

      <p>₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;