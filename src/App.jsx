import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Your useEffect code remains exactly here...
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get('https://dummyjson.com/products?limit=100');
        setProducts(productsRes.data.products);

        const categoriesRes = await axios.get('https://dummyjson.com/products/categories');
        if (categoriesRes.data && typeof categoriesRes.data[0] === 'object') {
          const categoryStrings = categoriesRes.data.map(cat => cat.slug || cat.name || cat);
          setCategories(categoryStrings);
        } else {
          setCategories(categoriesRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar sits safely alone at the very top */}
      <Navbar />

      {/* Main Container splits Sidebar and Products side-by-side */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto p-4 gap-6">
        
        {/* Left Side: Vertical Sidebar */}
        <aside className="w-64 shrink-0 hidden md:block">
          <Sidebar 
            categories={categories} 
            setSelectedCategory={setSelectedCategory} 
            activeCategory={selectedCategory} 
          />
        </aside>

        {/* Right Side: Product Grid */}
        <main className="flex-1">
          {isLoading ? (
            <div className="text-center py-10 font-semibold">Loading products...</div>
          ) : (
            <ProductList products={filteredProducts} />
          )}
        </main>

      </div>
    </div>
  );
}

export default App;