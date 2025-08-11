import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';

function Home() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <>
      <Navbar cartCount={cartCount} />

      {/* Full-width Hero */}
      <Hero />

      {/* Main content container for products */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductList addToCart={addToCart} />
      </div>
    </>
  );
}

export default Home;
