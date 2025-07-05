import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Wishlist: React.FC = () => {
  const { 
    isWishlistOpen, 
    setWishlistOpen, 
    wishlist, 
    removeFromWishlist,
    addToCart
  } = useStore();

  const handleAddToCart = (item: any) => {
    addToCart({
      productId: item.product.id,
      product: item.product,
      quantity: 1,
      selectedColor: item.product.colors[0],
      selectedSize: item.product.sizes[0],
      price: item.product.price
    });
    toast.success('Added to cart!');
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setWishlistOpen(false)}
          />

          {/* Wishlist Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Wishlist ({wishlist.length})
                </h2>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Your wishlist is empty</p>
                  <Link
                    to="/products"
                    onClick={() => setWishlistOpen(false)}
                    className="inline-block px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Discover Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <Link to={`/product/${item.product.id}`} onClick={() => setWishlistOpen(false)}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </Link>
                      
                      <div className="flex-1">
                        <Link 
                          to={`/product/${item.product.id}`} 
                          onClick={() => setWishlistOpen(false)}
                          className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.product.brand}
                        </p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          ${item.product.price}
                        </p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="p-2 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                          title="Add to Cart"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.productId)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          title="Remove from Wishlist"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};