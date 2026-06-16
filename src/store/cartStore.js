import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === product.id)

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }

      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      }
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        }
      }
      return {
        cartItems: state.cartItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      }
    }),

  clearCart: () => set({ cartItems: [] }),

  getTotalPrice: () => {
    const { cartItems } = get()
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  },

  getTotalItems: () => {
    const { cartItems } = get()
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  },
}))

export default useCartStore
