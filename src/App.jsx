import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Banner from './components/Banner';
import Sidebar from './components/Sidebar';
import ProductsGrid from './components/ProductsGrid';
import Cart from './components/Cart';
import useProductStore from './store/productStore';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    setProducts,
    setCategories,
    filterProducts,
    selectedCategory,
    searchTerm,
    products,
  } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get('https://dummyjson.com/products?limit=100');
        const products = productsRes.data.products;
        setProducts(products);

        const categoriesRes = await axios.get('https://dummyjson.com/products/categories');
        setCategories(categoriesRes.data);

        filterProducts(products, null, '');
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts(products, selectedCategory, searchTerm);
  }, [selectedCategory, searchTerm, products]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Banner />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4">
          SEE OUR PRODUCTS
        </h2>
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
  );
}

export default App;