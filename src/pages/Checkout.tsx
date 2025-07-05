import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, MapPin, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
// checkout
export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    cartSubtotal, 
    cartTax, 
    cartShipping, 
    cartTotal, 
    clearCart, 
    addOrder,
    paymentMethods,
    isAuthenticated 
  } = useStore();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0]?.id || '');
  const [isGuest, setIsGuest] = useState(!isAuthenticated);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add some items to your cart before checking out.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order
      const order = {
        id: `ORD-${Date.now()}`,
        userId: isGuest ? 'guest' : 'user-1',
        items: cart,
        subtotal: cartSubtotal,
        tax: cartTax,
        shipping: cartShipping,
        total: cartTotal,
        status: 'processing' as const,
        shippingAddress: {
          id: 'addr-1',
          label: 'Shipping',
          street: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country,
          isDefault: true
        },
        billingAddress: {
          id: 'addr-2',
          label: 'Billing',
          street: billingInfo.sameAsShipping ? shippingInfo.address : billingInfo.address,
          city: billingInfo.sameAsShipping ? shippingInfo.city : billingInfo.city,
          state: billingInfo.sameAsShipping ? shippingInfo.state : billingInfo.state,
          zipCode: billingInfo.sameAsShipping ? shippingInfo.zipCode : billingInfo.zipCode,
          country: billingInfo.sameAsShipping ? shippingInfo.country : billingInfo.country,
          isDefault: false
        },
        paymentMethod: paymentMethods.find(pm => pm.id === selectedPaymentMethod)?.name || 'Credit Card',
        paymentStatus: 'completed' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      };

      addOrder(order);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Guest Checkout Option */}
            {!isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Checkout Options
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={isGuest}
                      onChange={() => setIsGuest(true)}
                      className="text-black focus:ring-black dark:focus:ring-white"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      Continue as Guest
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={!isGuest}
                      onChange={() => setIsGuest(false)}
                      className="text-black focus:ring-black dark:focus:ring-white"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">
                      Create Account / Login
                    </span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Truck className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Shipping Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Country
                  </label>
                  <select
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedPaymentMethod === method.id}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="text-black focus:ring-black dark:focus:ring-white"
                    />
                    <span className="ml-3 text-2xl">{method.icon}</span>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{method.name}</span>
                  </label>
                ))}
              </div>

              {selectedPaymentMethod === 'card-1' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      required
                      value={cardInfo.nameOnCard}
                      onChange={(e) => setCardInfo({...cardInfo, nameOnCard: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={cardInfo.cardNumber}
                      onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardInfo.expiryDate}
                      onChange={(e) => setCardInfo({...cardInfo, expiryDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      value={cardInfo.cvv}
                      onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-gray-700"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.product.name}
                      </h3>
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

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-white">${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-gray-900 dark:text-white">
                    {cartShipping === 0 ? 'Free' : `$${cartShipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-6 flex items-center justify-center space-x-2 py-3 px-6 bg-black dark:bg-white text-white dark:text-black rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="h-5 w-5" />
                <span>
                  {isProcessing ? 'Processing...' : `Place Order - $${cartTotal.toFixed(2)}`}
                </span>
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                Your payment information is secure and encrypted
              </p>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};