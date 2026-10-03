import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import products from "./data/products";

function App() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sort, setSort] = useState("default");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Loading products
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Search, category, price filter and sorting
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesPrice =
        priceFilter === "All" ||
        (priceFilter === "under1000" &&
          product.price < 1000) ||
        (priceFilter === "1000to1500" &&
          product.price >= 1000 &&
          product.price <= 1500) ||
        (priceFilter === "above1500" &&
          product.price > 1500);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      if (sort === "low") {
        return a.price - b.price;
      }

      if (sort === "high") {
        return b.price - a.price;
      }

      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      return 0;
    });

  // Add product to cart
  function addToCart(product) {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);
    }
  }

  // Increase quantity
  function increaseQuantity(id) {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );
  }

  // Decrease quantity
  function decreaseQuantity(id) {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove product
  function removeFromCart(id) {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  }

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Calculate total cart items
  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Navbar cartCount={totalItems} />

      <Routes>

        {/* Home / Product Listing Page */}

        <Route
          path="/"
          element={
            <>
              <Home />

              {loading ? (
                <div className="loading">
                  <h2>Loading products...</h2>
                </div>
              ) : (
                <>

                  {/* Search */}

                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                    />
                  </div>

                  {/* Category Filter */}

                  <div className="category-box">

                    <button
                      onClick={() =>
                        setCategory("All")
                      }
                    >
                      All
                    </button>

                    <button
                      onClick={() =>
                        setCategory("Electronics")
                      }
                    >
                      Electronics
                    </button>

                    <button
                      onClick={() =>
                        setCategory("Fashion")
                      }
                    >
                      Fashion
                    </button>

                    <button
                      onClick={() =>
                        setCategory("Accessories")
                      }
                    >
                      Accessories
                    </button>

                  </div>

                  {/* Price Filter */}

                  <div className="price-filter">

                    <label htmlFor="price">
                      Price:
                    </label>

                    <select
                      id="price"
                      value={priceFilter}
                      onChange={(e) =>
                        setPriceFilter(e.target.value)
                      }
                    >

                      <option value="All">
                        All Prices
                      </option>

                      <option value="under1000">
                        Under ₹1000
                      </option>

                      <option value="1000to1500">
                        ₹1000 - ₹1500
                      </option>

                      <option value="above1500">
                        Above ₹1500
                      </option>

                    </select>

                  </div>

                  {/* Sort Products */}

                  <div className="sort-box">

                    <label htmlFor="sort">
                      Sort By:
                    </label>

                    <select
                      id="sort"
                      value={sort}
                      onChange={(e) =>
                        setSort(e.target.value)
                      }
                    >

                      <option value="default">
                        Default
                      </option>

                      <option value="low">
                        Price: Low to High
                      </option>

                      <option value="high">
                        Price: High to Low
                      </option>

                      <option value="name">
                        Name: A to Z
                      </option>

                    </select>

                  </div>

                  {/* Clear Filters */}

                  <button
                    className="clear-button"
                    onClick={() => {
                      setSearch("");
                      setCategory("All");
                      setPriceFilter("All");
                      setSort("default");
                    }}
                  >
                    Clear Filters
                  </button>

                  {/* Product Listing */}

                  <div
                    className="products"
                    id="products"
                  >

                    {filteredProducts.length === 0 ? (

                      <div className="no-products">

                        <h2>
                          No Products Found
                        </h2>

                        <p>
                          Try searching for a
                          different product.
                        </p>

                      </div>

                    ) : (

                      filteredProducts.map(
                        (product) => (

                          <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                          />

                        )
                      )

                    )}

                  </div>

                  {/* Cart */}

                  <div
                    className="cart"
                    id="cart"
                  >

                    <h2>
                      Cart 🛒 ({totalItems})
                    </h2>

                    {cart.length === 0 ? (

                      <p>
                        Your cart is empty
                      </p>

                    ) : (

                      <>

                        {cart.map((item) => (

                          <div
                            key={item.id}
                            className="cart-item"
                          >

                            <span>
                              {item.name}
                            </span>

                            <span>
                              ₹{item.price}
                            </span>

                            {/* Quantity */}

                            <div className="quantity">

                              <button
                                onClick={() =>
                                  decreaseQuantity(
                                    item.id
                                  )
                                }
                              >
                                −
                              </button>

                              <span>
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  increaseQuantity(
                                    item.id
                                  )
                                }
                              >
                                +
                              </button>

                            </div>

                            {/* Remove */}

                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.id
                                )
                              }
                            >
                              Remove
                            </button>

                          </div>

                        ))}

                        {/* Order Summary */}

                        <div className="order-summary">

                          <h3>
                            Order Summary
                          </h3>

                          {cart.map((item) => (

                            <div
                              key={item.id}
                              className="summary-item"
                            >

                              <span>
                                {item.name} ×{" "}
                                {item.quantity}
                              </span>

                              <span>
                                ₹
                                {item.price *
                                  item.quantity}
                              </span>

                            </div>

                          ))}

                          {/* Total */}

                          <h3 className="total">
                            Total: ₹{totalPrice}
                          </h3>

                          {/* Checkout */}

                          <button
                            className="checkout-button"
                            onClick={() => {
                              setOrderPlaced(true);
                              setCart([]);
                            }}
                          >
                            Checkout
                          </button>

                        </div>

                      </>

                    )}

                  </div>

                  {/* Order Confirmation */}

                  {orderPlaced && (

                    <div className="order-success">

                      <h2>
                        Order Placed Successfully! 🎉
                      </h2>

                      <p>
                        Thank you for shopping with us.
                      </p>

                    </div>

                  )}

                </>
              )}

            </>
          }
        />

        {/* Product Details Page */}

        <Route
          path="/products/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;