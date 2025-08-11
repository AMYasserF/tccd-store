import { useEffect, useState } from 'react';
import axios from 'axios';

function Hero() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch products and extract random images
  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        const allImages = res.data.map((p) => p.image);
        // Shuffle and take 5 random images
        const randomImages = allImages
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setImages(randomImages);
      })
      .catch((err) => console.error(err));
  }, []);

  // Auto-change image every 3 seconds
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="mb-6 h-64 animate-pulse rounded-lg bg-gray-200"></div>
    );
  }

  return (
    <div className="relative flex flex-col-reverse items-center justify-center gap-6 bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300 px-6 py-10 text-white sm:flex-row sm:justify-between sm:px-12 lg:px-20">
      {/* Left side: Text */}
      <div className="flex-1 text-center sm:text-left">
        <h2 className="mb-2 text-2xl font-bold text-gray-800 sm:text-4xl">
          Discover Our Products
        </h2>
        <p className="mb-4 text-sm text-gray-800 sm:text-base">
          Handpicked just for you
        </p>
        <h2 className="py-2 text-4xl font-bold text-white sm:text-6xl">
          Shop Now
        </h2>
      </div>

      {/* Right side: Product image */}
      <div className="flex flex-1 items-center justify-center">
        {images.length > 0 && (
          <img
            src={images[currentIndex]}
            alt="Featured Product"
            className="max-h-56 w-auto object-contain py-10 drop-shadow-lg transition-all duration-700 sm:max-h-72 lg:max-h-72"
          />
        )}
      </div>
    </div>
  );
}

export default Hero;
