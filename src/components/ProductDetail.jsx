import { useState } from 'react';
import { FaTimes, FaShoppingCart, FaStar } from 'react-icons/fa';
import useCartStore from '../store/cartStore';

function ProductDetail({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
            <h2 className="font-bold text-lg text-gray-800">Product Details</h2>
            <button onClick={onClose} className="text-2xl hover:text-primary">
              <FaTimes />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

            {/* Left - Images */}
            <div>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-72 object-cover rounded-lg mb-3"
              />
              {/* Extra images if available */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.slice(0, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      className="w-16 h-16 object-cover rounded border hover:border-primary cursor-pointer"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right - Details */}
            <div className="flex flex-col gap-3">
              {/* Category */}
              <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">
                {product.category}
              </p>

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                    size={14}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-1 rounded">
                    -{product.discountPercentage.toFixed(0)}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Stock */}
              <p className="text-sm">
                <span className="font-semibold">Stock: </span>
                <span className={product.stock > 10 ? 'text-green-600' : 'text-red-500'}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </p>

              {/* Brand */}
              {product.brand && (
                <p className="text-sm">
                  <span className="font-semibold">Brand: </span>
                  <span className="text-gray-600">{product.brand}</span>
                </p>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 mt-2">
                <span className="font-semibold text-sm">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 border rounded font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button
                  className="w-full bg-dark text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;