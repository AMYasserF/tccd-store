function ProductSkeleton() {
  return (
    <div className="flex animate-pulse flex-col rounded-lg bg-white p-4 shadow">
      {/* Image placeholder */}
      <div className="mb-4 h-48 w-full rounded bg-gray-200"></div>

      {/* Title placeholder */}
      <div className="mb-2 h-4 rounded bg-gray-200"></div>

      {/* Category placeholder */}
      <div className="mb-4 h-3 w-1/2 rounded bg-gray-200"></div>

      {/* Price placeholder */}
      <div className="mb-3 h-4 w-1/4 rounded bg-gray-200"></div>

      {/* Description placeholder */}
      <div className="mb-1 h-3 rounded bg-gray-200"></div>
      <div className="mb-1 h-3 rounded bg-gray-200"></div>

      {/* Buttons placeholder */}
      <div className="mt-auto flex gap-2 pt-4">
        <div className="h-8 flex-1 rounded bg-gray-200"></div>
        <div className="h-8 flex-1 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
export default ProductSkeleton;
