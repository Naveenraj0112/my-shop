import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="no-products">
        <h2>Product Not Found</h2>

        <button onClick={() => navigate("/")}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Products
      </button>

      <div className="details-container">
        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="details-info">
          <h1>{product.name}</h1>

          <p className="details-category">
            Category: {product.category}
          </p>

          <p className="details-rating">
            ⭐ {product.rating} / 5
          </p>

          <h2>₹{product.price}</h2>

          <p className="details-description">
            {product.description}
          </p>

          <button
            className="details-cart-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;