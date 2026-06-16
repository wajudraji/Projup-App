import { useState } from 'react';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import useProductStore from '../store/productStore';
import useCartStore from '../store/cartStore';

function Header({ onCartClick }) {
  const { setSearchTerm, searchTerm, categories, selectedCategory, setSelectedCategory } = useProductStore();
  const { getTotalItems } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white sticky top-0 z-50">
      {/* Top Bar - very small */}
      <div style={{ fontSize: '11px' }} className="py-0.5 px-6 flex justify-between items-center border-b border-orange-600">
        <div className="flex gap-2 items-center">
          <span>Seller Center</span><span>|</span>
          <span>Download</span><span>|</span>
          <span>Follow us on</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>Support</span><span>|</span>
          <span>Register</span><span>|</span>
          <span>Log in</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex items-center px-4 py-1.5 gap-3">
        <div className="flex items-center gap-2 min-w-fit">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
            {isMobileMenuOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
          </button>
          {/* Small logo like reference */}
          <h1 style={{ fontSize: '14px' }} className="font-bold">ProjUp.</h1>
        </div>

        {/* Search */}
        <div className="flex flex-1 gap-1">
          <input
            type="text"
            placeholder="Search your preferred items here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ fontSize: '11px' }}
            className="flex-1 px-3 py-1 rounded text-gray-900"
          />
          <button className="bg-red-700 px-2 py-1 rounded hover:bg-red-800">
            <FaSearch size={10} />
          </button>
        </div>

        {/* Cart */}
        <button onClick={onCartClick} className="flex items-center gap-1 hover:bg-orange-600 px-2 py-1 rounded">
          <FaShoppingCart size={14} />
          <span style={{ fontSize: '10px' }} className="bg-white text-primary px-1.5 py-0.5 rounded-full font-bold">
            {getTotalItems()}
          </span>
        </button>
      </nav>

      {/* Category Navigation */}
      <div style={{ fontSize: '11px' }} className="px-4 py-1 flex gap-4 overflow-x-auto">
        {categories.slice(0, 8).map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`whitespace-nowrap pb-1 border-b-2 transition ${
              selectedCategory === cat.slug ? 'border-white font-bold' : 'border-transparent hover:border-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Header;