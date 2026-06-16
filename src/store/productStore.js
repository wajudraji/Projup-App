import { create } from 'zustand'

const useProductStore = create((set) => ({
  products: [],
  categories: [],
  selectedCategory: null,
  searchTerm: '',
  filteredProducts: [],

  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilteredProducts: (products) => set({ filteredProducts: products }),

  filterProducts: (products, category, searchTerm) => {
    let filtered = products

    if (category) {
      filtered = filtered.filter((p) => p.category === category)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    set({ filteredProducts: filtered })
  },
}))

export default useProductStore
