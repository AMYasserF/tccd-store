import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';

function Navbar({ cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger pop animation when cartCount changes
  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      const timeout = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cartCount]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo section */}
        <div className="flex cursor-pointer items-center gap-2">
          <img
            src={logo}
            alt="TCCD Logo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="text-lg font-bold">TCCD Store</span>
        </div>

        <div className="relative">
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
              animateCart ? 'scale-125' : ''
            }`}
          >
            🛒
          </span>

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-xs text-white shadow">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
