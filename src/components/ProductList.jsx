import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories'),
        ]);
        setAllProducts(prodRes.data);
        setProducts(prodRes.data.slice(0, visibleCount));
        setCategories(catRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = useCallback(() => {
    return allProducts.filter((p) => {
      const matchesName = p.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = category ? p.category === category : true;

      const min = minPrice !== '' ? parseFloat(minPrice) : null;
      const max = maxPrice !== '' ? parseFloat(maxPrice) : null;

      // Ensure price constraints are valid
      if (min !== null && max !== null && min > max) {
        return false; // Invalid range, exclude
      }

      const matchesMin = min !== null ? p.price >= min : true;
      const matchesMax = max !== null ? p.price <= max : true;

      return matchesName && matchesCategory && matchesMin && matchesMax;
    });
  }, [allProducts, searchTerm, category, minPrice, maxPrice]);

  const handleMinPriceChange = (e) => {
    const value = Math.max(0, Number(e.target.value)); // Prevent negative values
    setMinPrice(value);
    if (maxPrice && value > maxPrice) {
      setMaxPrice(value); // Adjust maxPrice if minPrice exceeds it
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(0, Number(e.target.value)); // Prevent negative values
    setMaxPrice(value);
    if (minPrice && value < minPrice) {
      setMinPrice(value); // Adjust minPrice if maxPrice is less than it
    }
  };

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loadingMore &&
        products.length < filteredProducts().length
      ) {
        setLoadingMore(true);
        setTimeout(() => {
          const newCount = visibleCount + 4;
          setProducts(filteredProducts().slice(0, newCount));
          setVisibleCount(newCount);
          setLoadingMore(false);
        }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [products, visibleCount, loadingMore]);

  // Update products when filters change
  useEffect(() => {
    setVisibleCount(8);
    setProducts(filteredProducts().slice(0, 8));
  }, [searchTerm, category, minPrice, maxPrice, filteredProducts]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Filter Bar */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name..."
            className="focus:border-primary focus:ring-primary/20 w-full rounded-md border border-gray-300 p-2 outline-none transition focus:ring-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category */}
          <select
            className="focus:border-primary focus:ring-primary/20 w-full rounded-md border border-gray-300 p-2 outline-none transition focus:ring-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Min Price */}
          <input
            type="number"
            min="0"
            max={maxPrice ? maxPrice : '1000'}
            placeholder="Min Price"
            className="focus:border-primary focus:ring-primary/20 w-full rounded-md border border-gray-300 p-2 outline-none transition focus:ring-2"
            value={minPrice}
            onChange={handleMinPriceChange}
          />

          {/* Max Price */}
          <input
            min={minPrice ? minPrice : '0'}
            type="number"
            placeholder="Max Price"
            className="focus:border-primary focus:ring-primary/20 w-full rounded-md border border-gray-300 p-2 outline-none transition focus:ring-2"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      {/* Products */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
      </div>

      {/* Infinite scroll spinner */}
      {loadingMore && !loading && (
        <div className="flex justify-center py-6">
          <svg
            className="animate-spin"
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="4" />
            <path
              d="M22 12a10 10 0 00-10-10"
              stroke="#0b74ff"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </main>
  );
}

export default ProductList;
