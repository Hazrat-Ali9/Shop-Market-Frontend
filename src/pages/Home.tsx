import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Star } from 'lucide-react';
import { BannerCarousel } from '../components/common/BannerCarousel';
import { ProductCard } from '../components/common/ProductCard';
import { useStore } from '../store/useStore';
import { allProducts } from '../data/products';
// Home tsx
export const Home: React.FC = () => {
  const { setProducts } = useStore();

  React.useEffect(() => {
    setProducts(allProducts);
  }, [setProducts]);

  const featuredProducts = allProducts.filter(p => p.isFeatured).slice(0, 8);
  const newProducts = allProducts.filter(p => p.isNew).slice(0, 8);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Banner Carousel */}
      <section className="pt-16">
        <BannerCarousel />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white dark:text-black" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400">Free shipping on all orders over $75</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white dark:text-black" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure Payment</h3>
              <p className="text-gray-600 dark:text-gray-400">100% secure payment with multiple options</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-white dark:text-black" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400">Round-the-clock customer support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Handpicked selections from our premium collection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              New Arrivals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Fresh styles just landed - be the first to wear them
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-black dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
              Subscribe to our newsletter for exclusive deals and latest fashion updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg text-gray-900 flex-1 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};