import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Banner from './components/Banner'
import Sidebar from './components/Sidebar'
import ProductsGrid from './components/ProductsGrid'
import Cart from './components/Cart'
import useProductStore from './store/productStore'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const {
    setProducts,
    setCategories,
    filterProducts,
    selectedCategory,
    searchTerm,
    products,
  } = useProductStore()

  // Fetch products and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all products
        const productsRes = await axios.get(
          'https://dummyjson.com/products?limit=100'
        )
        setProducts(productsRes.data.products)

        // Fetch categories. DummyJSON returns an array of
        // { slug, name, url } objects, so map them to slug strings
        // to match the product `category` field.
        const categoriesRes = await axios.get(
          'https://dummyjson.com/products/categories'
        )
        const categorySlugs = categoriesRes.data.map((cat) =>
          typeof cat === 'string' ? cat : cat.slug
        )
        setCategories(categorySlugs)
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [setProducts, setCategories])

  // Filter products whenever category or search term changes
  useEffect(() => {
    filterProducts(products, selectedCategory, searchTerm)
  }, [selectedCategory, searchTerm, products, filterProducts])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Banner />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold border-l-4 border-primary pl-4">
            SEE OUR PRODUCTS
          </h2>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden bg-primary text-white px-4 py-2 rounded font-semibold"
          >
            Categories
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <div className="md:col-span-3">
            {isLoading ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-xl">Loading products...</p>
              </div>
            ) : (
              <ProductsGrid />
            )}
          </div>
        </div>
      </main>

      <footer className="bg-primary text-white text-center py-6 mt-12">
        <p className="font-semibold">&copy; 2026 ProjUp. All rights reserved.</p>
      </footer>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export default App
