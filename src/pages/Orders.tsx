import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export const Orders: React.FC = () => {
  const { orders, isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please Login
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be logged in to view your orders.
          </p>
          <Link
            to="/login"
            className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'processing':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'shipped':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'delivered':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Order History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage your orders
          </p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No orders yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start shopping to see your orders here
            </p>
            <Link
              to="/products"
              className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Placed on {order.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Total Amount
                      </h4>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Payment Method
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.paymentMethod}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Tracking Number
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.trackingNumber || 'Not available'}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Items ({order.items.length})
                    </h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.product.name}
                            </h5>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {item.selectedColor} • {item.selectedSize} • Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
                        <p>Tax: ${order.tax.toFixed(2)}</p>
                        <p>Shipping: ${order.shipping.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          Total: ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {order.estimatedDelivery && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Estimated delivery: {order.estimatedDelivery.toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};