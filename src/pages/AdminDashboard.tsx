import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Product, User as UserType } from '../types';
import { ProductForm } from '../components/admin/ProductForm';
import { UserManagement } from '../components/admin/UserManagement';
// admin dashboard
export const AdminDashboard: React.FC = () => {
  const { 
    user, 
    isAuthenticated, 
    products, 
    users, 
    orders, 
    dashboardStats,
    updateProduct,
    deleteProduct,
    toggleProductVisibility
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'users' | 'orders'>('overview');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'visible' | 'hidden'>('all');

  // Redirect if not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'visible' && product.isVisible !== false) ||
                         (filterStatus === 'hidden' && product.isVisible === false);
    
    return matchesSearch && matchesFilter;
  });

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleToggleVisibility = (productId: string) => {
    toggleProductVisibility(productId);
  };

  const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {trend && (
            <p className={`text-sm flex items-center mt-1 ${
              trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              {trend > 0 ? '+' : ''}{trend}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your e-commerce platform
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: TrendingUp },
              { id: 'products', name: 'Products', icon: Package },
              { id: 'users', name: 'Users', icon: Users },
              { id: 'orders', name: 'Orders', icon: ShoppingCart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-burgundy text-burgundy'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                style={activeTab === tab.id ? { borderColor: '#800020', color: '#800020' } : {}}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Products"
                value={dashboardStats.totalProducts}
                icon={Package}
                trend={12}
                color="bg-blue-500"
              />
              <StatCard
                title="Total Users"
                value={dashboardStats.totalUsers}
                icon={Users}
                trend={8}
                color="bg-green-500"
              />
              <StatCard
                title="Total Orders"
                value={dashboardStats.totalOrders}
                icon={ShoppingCart}
                trend={15}
                color="bg-purple-500"
              />
              <StatCard
                title="Revenue"
                value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
                icon={DollarSign}
                trend={23}
                color="bg-yellow-500"
              />
            </div>

            {/* Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Low Stock Alert
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {dashboardStats.lowStockProducts} products are running low on stock
                </p>
                <button className="text-burgundy hover:underline text-sm font-medium"
                        style={{ color: '#800020' }}>
                  View Products
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <ShoppingCart className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Pending Orders
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {dashboardStats.pendingOrders} orders need attention
                </p>
                <button className="text-burgundy hover:underline text-sm font-medium"
                        style={{ color: '#800020' }}>
                  View Orders
                </button>
              </motion.div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Product Management Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-800"
                    style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-800"
                  style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
                >
                  <option value="all">All Products</option>
                  <option value="visible">Visible</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setShowProductForm(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-burgundy text-white rounded-lg hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#800020' }}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {product.brand}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm ${
                            product.stockCount < 10 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {product.stockCount}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.isVisible !== false
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {product.isVisible !== false ? 'Visible' : 'Hidden'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleToggleVisibility(product.id)}
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                              title={product.isVisible !== false ? 'Hide Product' : 'Show Product'}
                            >
                              {product.isVisible !== false ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-burgundy hover:opacity-75"
                              style={{ color: '#800020' }}
                              title="Edit Product"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && <UserManagement />}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Order management functionality will be implemented here.
            </p>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};