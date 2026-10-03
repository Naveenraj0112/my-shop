function Navbar({ cartCount }) {
  return (
    <nav>
      <h2>My Shop</h2>

      <div>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#cart">Cart 🛒 ({cartCount})</a>
      </div>
    </nav>
  );
}

export default Navbar;