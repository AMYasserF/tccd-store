function ProductCard({ product, addToCart }) {
  return (
    <div className="rounded-lg bg-white shadow transition-all duration-300 hover:border hover:border-sky-300 hover:shadow-[0_4px_20px_rgba(56,189,248,0.5)]">
      <div className="product-img-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain p-4"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h2 className="mb-1 line-clamp-1 text-sm font-semibold text-slate-800">
          {product.title}
        </h2>
        <p className="mb-2 text-xs capitalize text-gray-500">
          {product.category}
        </p>

        <div className="flex items-baseline justify-between">
          <p className="text-primary font-bold">${product.price}</p>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="mt-4 flex gap-3">
          <button
            onClick={addToCart}
            aria-label={`Add ${product.title} to cart`}
            className="bg-primary u-transition flex-1 rounded-md py-2 text-white hover:brightness-95"
          >
            Add to Cart
          </button>

          <button
            aria-label={`View details for ${product.title}`}
            className="u-transition flex-1 rounded-md border border-slate-200 py-2 text-slate-700 hover:bg-slate-50"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
