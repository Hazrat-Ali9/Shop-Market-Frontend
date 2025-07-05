import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Plus, Minus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Product } from '../../types';
import toast from 'react-hot-toast';
// Product from
interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    subcategory: '',
    brand: '',
    images: [''],
    colors: [''],
    sizes: [''],
    stockCount: 0,
    tags: [''],
    gender: 'unisex' as 'men' | 'women' | 'unisex',
    isNew: false,
    isFeatured: false,
    isVisible: true,
    discount: 0,
    specifications: {} as Record<string, string>
  });

  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice || 0,
        category: product.category,
        subcategory: product.subcategory,
        brand: product.brand,
        images: product.images,
        colors: product.colors,
        sizes: product.sizes,
        stockCount: product.stockCount,
        tags: product.tags,
        gender: product.gender,
        isNew: product.isNew || false,
        isFeatured: product.isFeatured || false,
        isVisible: product.isVisible !== false,
        discount: product.discount || 0,
        specifications: product.specifications || {}
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'inStock'> = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== ''),
      colors: formData.colors.filter(color => color.trim() !== ''),
      sizes: formData.sizes.filter(size => size.trim() !== ''),
      tags: formData.tags.filter(tag => tag.trim() !== ''),
      inStock: formData.stockCount > 0,
      rating: product?.rating || 0,
      reviewCount: product?.reviewCount || 0,
      createdAt: product?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (product) {
      updateProduct(product.id, productData as Product);
      toast.success('Product updated successfully!');
    } else {
      addProduct({
        ...productData,
        id: `product-${Date.now()}`,
        rating: 0,
        reviewCount: 0,
        inStock: formData.stockCount > 0
      } as Product);
      toast.success('Product added successfully!');
    }
    
    onClose();
  };

  const addArrayItem = (field: 'images' | 'colors' | 'sizes' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'images' | 'colors' | 'sizes' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (field: 'images' | 'colors' | 'sizes' | 'tags', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addSpecification = () => {
    if (specKey && specValue) {
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey]: specValue
        }
      }));
      setSpecKey('');
      setSpecValue('');
    }
  };

  const removeSpecification = (key: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications).filter(([k]) => k !== key)
      )
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand *
              </label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              >
                <option value="">Select Category</option>
                <option value="Clothing">Clothing</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Activewear">Activewear</option>
                <option value="Lingerie">Lingerie</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subcategory
              </label>
              <input
                type="text"
                value={formData.subcategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Original Price
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stock Count *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stockCount}
                onChange={(e) => setFormData(prev => ({ ...prev, stockCount: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender *
              </label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              >
                <option value="unisex">Unisex</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
              style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Product Images
            </label>
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => updateArrayItem('images', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                    style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('images', index)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('images')}
                className="flex items-center space-x-2 px-3 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Image</span>
              </button>
            </div>
          </div>

          {/* Colors and Sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Available Colors
              </label>
              <div className="space-y-2">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Color name"
                      value={color}
                      onChange={(e) => updateArrayItem('colors', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                      style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('colors', index)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('colors')}
                  className="flex items-center space-x-2 px-3 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Color</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Available Sizes
              </label>
              <div className="space-y-2">
                {formData.sizes.map((size, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Size"
                      value={size}
                      onChange={(e) => updateArrayItem('sizes', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                      style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('sizes', index)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('sizes')}
                  className="flex items-center space-x-2 px-3 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Size</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="space-y-2">
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Tag"
                    value={tag}
                    onChange={(e) => updateArrayItem('tags', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                    style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('tags', index)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('tags')}
                className="flex items-center space-x-2 px-3 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Tag</span>
              </button>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Specifications
            </label>
            <div className="space-y-2">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={key}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600"
                  />
                  <input
                    type="text"
                    value={value}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecification(key)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Specification key"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                  style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
                />
                <input
                  type="text"
                  placeholder="Specification value"
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                  style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
                />
                <button
                  type="button"
                  onClick={addSpecification}
                  className="p-2 text-burgundy hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                  style={{ color: '#800020' }}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Flags */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData(prev => ({ ...prev, isNew: e.target.checked }))}
                className="rounded border-gray-300 text-burgundy focus:ring-burgundy"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">New Product</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="rounded border-gray-300 text-burgundy focus:ring-burgundy"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Featured</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isVisible}
                onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                className="rounded border-gray-300 text-burgundy focus:ring-burgundy"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Visible</span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Discount %
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) => setFormData(prev => ({ ...prev, discount: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy dark:bg-gray-700"
                style={{ '--tw-ring-color': '#800020' } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-burgundy text-white rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#800020' }}
            >
              {product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};