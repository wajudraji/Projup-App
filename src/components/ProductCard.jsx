import { FaShoppingCart, FaStar } from 'react-icons/fa'
import useCartStore from '../store/cartStore'

function ProductCard({ product }) {
  const { addToCart } = useCartStore()

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden bg-gray-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-110 transition duration-300"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase font-semibold">
            {product.category}
          </p>
          <h3 className="font-semibold text-sm line-clamp-2 my-2 h-10">
            {product.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-xs text-green-600 font-bold">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <FaStar className="text-accent" /> {product.rating}
          </div>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-primary text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-orange-600 transition font-semibold"
        >
          <FaShoppingCart /> Add
        </button>
      </div>
    </div>
  )
}

export default ProductCard
