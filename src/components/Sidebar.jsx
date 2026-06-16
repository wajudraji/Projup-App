import { FaTimes } from 'react-icons/fa'
import useProductStore from '../store/productStore'

function Sidebar({ isOpen, onClose }) {
  const { categories, selectedCategory, setSelectedCategory } = useProductStore()

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white p-4 rounded-lg h-fit fixed md:relative top-0 left-0 w-64 md:w-full z-40 md:z-auto transition-transform md:transition-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="font-bold text-lg">Categories</h2>
          <button onClick={onClose} className="text-2xl" aria-label="Close categories">
            <FaTimes />
          </button>
        </div>

        <h2 className="font-bold text-lg mb-4 border-l-4 border-primary pl-2 hidden md:block">
          ALL CATEGORIES
        </h2>

        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`text-left w-full p-2 rounded transition ${
                !selectedCategory
                  ? 'bg-primary text-white font-bold'
                  : 'hover:bg-gray-100'
              }`}
            >
              All Products
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategoryClick(category)}
                className={`text-left w-full p-2 rounded capitalize transition ${
                  selectedCategory === category
                    ? 'bg-primary text-white font-bold'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}

export default Sidebar
