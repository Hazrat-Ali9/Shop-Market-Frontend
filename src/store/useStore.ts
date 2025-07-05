import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, User, CartItem, WishlistItem, Order, FilterOptions, PaymentMethod, SearchSuggestion, DashboardStats } from '../types';

interface AppState {
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // User
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;

  // Users Management (Admin)
  users: User[];
  updateUserStatus: (userId: string, isActive: boolean) => void;
  updateUserRole: (userId: string, role: 'user' | 'admin') => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartTax: number;
  cartShipping: number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  toggleProductVisibility: (id: string) => void;
  filteredProducts: Product[];
  setFilteredProducts: (products: Product[]) => void;
  
  // Filters
  filters: FilterOptions;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchSuggestions: SearchSuggestion[];
  getSearchSuggestions: (query: string) => void;

  // Dashboard Stats
  dashboardStats: DashboardStats;

  // Payment Methods
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;

  // UI
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
}

const defaultFilters: FilterOptions = {
  category: [],
  brand: [],
  color: [],
  size: [],
  priceRange: [0, 1000],
  inStock: false,
  rating: 0,
  sortBy: 'newest'
};

const TAX_RATE = 0.08; // 8% tax
const SHIPPING_RATE = 9.99;
const FREE_SHIPPING_THRESHOLD = 75;

// Mock users data
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@shopmarket.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    addresses: [],
    orders: [],
    wishlist: [],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date()
  },
  {
    id: 'user-2',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    addresses: [],
    orders: [],
    wishlist: [],
    isActive: true,
    createdAt: new Date('2024-02-15'),
    lastLogin: new Date('2024-12-01')
  },
  {
    id: 'user-3',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'user',
    addresses: [],
    orders: [],
    wishlist: [],
    isActive: false,
    createdAt: new Date('2024-03-10'),
    lastLogin: new Date('2024-11-20')
  }
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // User
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, cart: [], wishlist: [], orders: [] }),

      // Users Management
      users: mockUsers,
      updateUserStatus: (userId, isActive) => set((state) => ({
        users: state.users.map(user => 
          user.id === userId ? { ...user, isActive } : user
        )
      })),
      updateUserRole: (userId, role) => set((state) => ({
        users: state.users.map(user => 
          user.id === userId ? { ...user, role } : user
        )
      })),

      // Cart
      cart: [],
      addToCart: (item) => {
        const existingItem = get().cart.find(
          (cartItem) => 
            cartItem.productId === item.productId && 
            cartItem.selectedColor === item.selectedColor && 
            cartItem.selectedSize === item.selectedSize
        );

        if (existingItem) {
          set((state) => ({
            cart: state.cart.map((cartItem) =>
              cartItem.id === existingItem.id
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            )
          }));
        } else {
          set((state) => ({
            cart: [...state.cart, { ...item, id: Date.now().toString() }]
          }));
        }
      },
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
      })),
      updateCartQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },
      clearCart: () => set({ cart: [] }),
      get cartSubtotal() {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      get cartTax() {
        return get().cartSubtotal * TAX_RATE;
      },
      get cartShipping() {
        return get().cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
      },
      get cartTotal() {
        return get().cartSubtotal + get().cartTax + get().cartShipping;
      },

      // Wishlist
      wishlist: [],
      addToWishlist: (product) => set((state) => ({
        wishlist: [...state.wishlist, {
          id: Date.now().toString(),
          productId: product.id,
          product,
          addedAt: new Date()
        }]
      })),
      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter((item) => item.productId !== productId)
      })),
      isInWishlist: (productId) => get().wishlist.some((item) => item.productId === productId),

      // Orders
      orders: [],
      addOrder: (order) => set((state) => ({
        orders: [order, ...state.orders]
      })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? { ...order, status, updatedAt: new Date() } : order
        )
      })),

      // Products
      products: [],
      setProducts: (products) => set({ products }),
      addProduct: (product) => set((state) => ({
        products: [...state.products, product]
      })),
      updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map(product => 
          product.id === id ? { ...updatedProduct, id } : product
        )
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(product => product.id !== id)
      })),
      toggleProductVisibility: (id) => set((state) => ({
        products: state.products.map(product => 
          product.id === id 
            ? { ...product, isVisible: product.isVisible === false ? true : false }
            : product
        )
      })),
      filteredProducts: [],
      setFilteredProducts: (products) => set({ filteredProducts: products }),

      // Filters
      filters: defaultFilters,
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),
      resetFilters: () => set({ filters: defaultFilters }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      searchSuggestions: [],
      getSearchSuggestions: (query) => {
        const products = get().products;
        const suggestions: SearchSuggestion[] = [];
        
        // Product name suggestions
        const productMatches = products
          .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 3)
          .map(p => ({
            id: `product-${p.id}`,
            text: p.name,
            type: 'product' as const
          }));
        
        // Category suggestions
        const categories = [...new Set(products.map(p => p.category))]
          .filter(c => c.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 2)
          .map(c => ({
            id: `category-${c}`,
            text: c,
            type: 'category' as const,
            count: products.filter(p => p.category === c).length
          }));
        
        // Brand suggestions
        const brands = [...new Set(products.map(p => p.brand))]
          .filter(b => b.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 2)
          .map(b => ({
            id: `brand-${b}`,
            text: b,
            type: 'brand' as const,
            count: products.filter(p => p.brand === b).length
          }));
        
        suggestions.push(...productMatches, ...categories, ...brands);
        set({ searchSuggestions: suggestions });
      },

      // Dashboard Stats
      get dashboardStats(): DashboardStats {
        const state = get();
        return {
          totalProducts: state.products.length,
          totalUsers: state.users.length,
          totalOrders: state.orders.length,
          totalRevenue: state.orders.reduce((sum, order) => sum + order.total, 0),
          lowStockProducts: state.products.filter(p => p.stockCount < 10).length,
          pendingOrders: state.orders.filter(o => o.status === 'pending').length
        };
      },

      // Payment Methods
      paymentMethods: [
        {
          id: 'card-1',
          type: 'card',
          name: 'Credit/Debit Card',
          icon: '💳',
          isDefault: true
        },
        {
          id: 'paypal-1',
          type: 'paypal',
          name: 'PayPal',
          icon: '🅿️',
          isDefault: false
        },
        {
          id: 'apple-pay-1',
          type: 'apple-pay',
          name: 'Apple Pay',
          icon: '🍎',
          isDefault: false
        },
        {
          id: 'google-pay-1',
          type: 'google-pay',
          name: 'Google Pay',
          icon: '🔵',
          isDefault: false
        }
      ],
      addPaymentMethod: (method) => set((state) => ({
        paymentMethods: [...state.paymentMethods, method]
      })),
      removePaymentMethod: (id) => set((state) => ({
        paymentMethods: state.paymentMethods.filter((method) => method.id !== id)
      })),

      // UI
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isWishlistOpen: false,
      setWishlistOpen: (open) => set({ isWishlistOpen: open })
    }),
    {
      name: 'ecommerce-store',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        cart: state.cart,
        wishlist: state.wishlist,
        orders: state.orders,
        paymentMethods: state.paymentMethods,
        users: state.users
      })
    }
  )
);