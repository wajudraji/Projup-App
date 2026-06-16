import { FaTrash, FaTimes, FaShoppingBag } from 'react-icons/fa'
import useCartStore from '../store/cartStore'

function Cart({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCartStore()
  const total = getTotalPrice()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg z-50 overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold">Recently Added Products</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:text-primary"
            aria-label="Close cart"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center">
              <FaShoppingBag className="text-6xl mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg mb-4">No Products Yet</p>
              <p className="text-gray-400 mb-4">Your shopping cart is empty.</p>
              <button
                onClick={onClose}
                className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-orange-600"
              >
                Go shopping Now
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 border-b pb-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-primary font-bold text-sm mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-3 text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700 text-lg"
                          aria-label="Remove item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 sticky bottom-0 bg-white">
                <div className="flex justify-between mb-4 text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-primary text-white py-3 rounded mb-2 font-bold hover:bg-orange-600 transition">
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full border border-gray-300 py-2 rounded hover:bg-gray-50 transition"
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart
