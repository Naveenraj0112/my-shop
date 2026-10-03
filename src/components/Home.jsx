function Home() {
  return (
    <section className="home" id="home">
      <h1>Welcome to My Shop</h1>

      <p>Find the products you love at great prices.</p>

      <button
        onClick={() => {
          document.getElementById("products").scrollIntoView({
            behavior: "smooth"
          });
        }}
      >
        Shop Now
      </button>
    </section>
  );
}

export default Home;