import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Cart } from './components/common/Cart';
import { Wishlist } from './components/common/Wishlist';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Orders } from './pages/Orders';
import { Checkout } from './pages/Checkout';
import { Auth } from './pages/Auth';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  const { isDarkMode } = useStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/men" element={<Products />} />
            <Route path="/women" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/wishlist" element={<div className="pt-20 p-8 text-center">Wishlist page - use the wishlist sidebar instead!</div>} />
          </Routes>
        </main>
        <Footer />
        <Cart />
        <Wishlist />
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;