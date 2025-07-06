import { Product } from '../types';

export const products: Product[] = [
  // Men's Products
  {
    id: 'men-tshirt-1',
    name: 'Premium Cotton T-Shirt',
    description: 'Ultra-soft premium cotton t-shirt with modern fit. Perfect for casual wear and layering. Made from 100% organic cotton with reinforced seams for durability.',
    price: 29.99,
    originalPrice: 39.99,
    category: 'Clothing',
    subcategory: 'T-Shirts',
    brand: 'Essential Wear',
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8532618/pexels-photo-8532618.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: ['Black', 'White', 'Navy', 'Gray', 'Red'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 150,
    rating: 4.5,
    reviewCount: 234,
    tags: ['casual', 'cotton', 'basic', 'comfortable'],
    gender: 'men',
    isNew: true,
    discount: 25,
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Regular Fit',
      'Care': 'Machine Wash Cold',
      'Origin': 'Made in USA'
    },
    relatedProducts: ['men-jeans-1', 'men-jacket-1']
  },
  {
    id: 'men-jeans-1',
    name: 'Slim Fit Denim Jeans',
    description: 'Modern slim-fit jeans crafted from premium stretch denim. Features classic five-pocket styling with contemporary tapered leg for a sleek silhouette.',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Clothing',
    subcategory: 'Jeans',
    brand: 'Denim Co',
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: ['Dark Blue', 'Light Blue', 'Black', 'Gray'],
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    inStock: true,
    stockCount: 89,
    rating: 4.3,
    reviewCount: 156,
    tags: ['denim', 'casual', 'slim-fit', 'stretch'],
    gender: 'men',
    discount: 20,
    specifications: {
      'Material': '98% Cotton, 2% Elastane',
      'Fit': 'Slim Fit',
      'Rise': 'Mid Rise',
      'Care': 'Machine Wash Cold'
    },
    relatedProducts: ['men-tshirt-1', 'men-shoes-1']
  },
  {
    id: 'men-jacket-1',
    name: 'Leather Bomber Jacket',
    description: 'Genuine leather bomber jacket with premium craftsmanship. Features ribbed cuffs and hem, full zip closure, and interior pockets for functionality.',
    price: 299.99,
    originalPrice: 399.99,
    category: 'Clothing',
    subcategory: 'Jackets',
    brand: 'Leather Works',
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: ['Black', 'Brown', 'Tan'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 45,
    rating: 4.8,
    reviewCount: 89,
    tags: ['leather', 'bomber', 'premium', 'outerwear'],
    gender: 'men',
    isFeatured: true,
    discount: 25,
    specifications: {
      'Material': '100% Genuine Leather',
      'Lining': 'Polyester',
      'Closure': 'Full Zip',
      'Care': 'Professional Clean Only'
    },
    relatedProducts: ['men-tshirt-1', 'men-jeans-1']
  },
  {
    id: 'men-shoes-1',
    name: 'Classic Oxford Shoes',
    description: 'Timeless oxford shoes crafted from premium leather. Features traditional lace-up design with leather sole and cushioned insole for all-day comfort.',
    price: 149.99,
    originalPrice: 199.99,
    category: 'Footwear',
    subcategory: 'Dress Shoes',
    brand: 'Classic Steps',
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: ['Black', 'Brown', 'Tan'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    inStock: true,
    stockCount: 78,
    rating: 4.5,
    reviewCount: 123,
    tags: ['formal', 'leather', 'oxford', 'dress'],
    gender: 'men',
    discount: 25,
    specifications: {
      'Material': 'Premium Leather',
      'Sole': 'Leather',
      'Closure': 'Lace-up',
      'Care': 'Polish Regularly'
    },
    relatedProducts: ['men-jeans-1', 'men-jacket-1']
  },
  // Women's Products
  {
    id: 'women-dress-1',
    name: 'Elegant Maxi Dress',
    description: 'Flowing maxi dress perfect for special occasions and everyday elegance. Features adjustable straps, side pockets, and a flattering A-line silhouette.',
    price: 89.99,
    originalPrice: 119.99,
    category: 'Clothing',
    subcategory: 'Dresses',
    brand: 'Elegance',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: ['Navy', 'Burgundy', 'Emerald', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 67,
    rating: 4.6,
    reviewCount: 178,
    tags: ['elegant', 'maxi', 'special-occasion', 'flowing'],
    gender: 'women',
    isNew: true,
    discount: 25,
    specifications: {
      'Material': '95% Polyester, 5% Elastane',
      'Length': 'Maxi',
      'Fit': 'A-line',
      'Care': 'Hand Wash Cold'
    },
    relatedProducts: ['women-blouse-1', 'women-bag-1']
  },
  {
    id: 'women-blouse-1',
    name: 'Silk Button-Up Blouse',
    description: 'Luxurious silk blouse with classic button-up design and elegant drape. Perfect for professional settings or elevated casual looks.',
    price: 129.99,
    originalPrice: 169.99,
    category: 'Clothing',
    subcategory: 'Blouses',
    brand: 'Silk Studio',
    images: [
      'https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: ['Ivory', 'Blush', 'Navy', 'Charcoal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 34,
    rating: 4.7,
    reviewCount: 92,
    tags: ['silk', 'professional', 'luxury', 'button-up'],
    gender: 'women',
    isFeatured: true,
    discount: 23,
    specifications: {
      'Material': '100% Mulberry Silk',
      'Fit': 'Regular',
      'Closure': 'Button-up',
      'Care': 'Dry Clean Only'
    },
    relatedProducts: ['women-dress-1', 'women-leggings-1']
  },
  {
    id: 'women-leggings-1',
    name: 'High-Waist Yoga Leggings',
    description: 'Performance leggings with moisture-wicking fabric and comfortable high-waist design. Perfect for yoga, gym, or casual wear.',
    price: 49.99,
    originalPrice: 69.99,
    category: 'Activewear',
    subcategory: 'Leggings',
    brand: 'Active Life',
    images: [
      'https://images.pexels.com/photos/2827400/pexels-photo-2827400.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: ['Black', 'Navy', 'Charcoal', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 125,
    rating: 4.4,
    reviewCount: 267,
    tags: ['activewear', 'yoga', 'high-waist', 'performance'],
    gender: 'women',
    discount: 29,
    specifications: {
      'Material': '88% Polyester, 12% Elastane',
      'Fit': 'Compression',
      'Waist': 'High-waist',
      'Care': 'Machine Wash Cold'
    },
    relatedProducts: ['women-blouse-1', 'women-bag-1']
  },
  {
    id: 'women-bag-1',
    name: 'Designer Leather Handbag',
    description: 'Elegant leather handbag with multiple compartments and premium finish. Features adjustable strap and gold-tone hardware.',
    price: 199.99,
    originalPrice: 299.99,
    category: 'Accessories',
    subcategory: 'Handbags',
    brand: 'Luxury Bags',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    colors: ['Black', 'Brown', 'Tan', 'Navy'],
    sizes: ['One Size'],
    inStock: true,
    stockCount: 56,
    rating: 4.8,
    reviewCount: 89,
    tags: ['luxury', 'leather', 'designer', 'handbag'],
    gender: 'women',
    isFeatured: true,
    discount: 33,
    specifications: {
      'Material': 'Genuine Leather',
      'Dimensions': '12" x 8" x 4"',
      'Strap': 'Adjustable',
      'Care': 'Leather Conditioner'
    },
    relatedProducts: ['women-dress-1', 'women-blouse-1']
  }
];

// Generate additional products for a fuller catalog
const generateAdditionalProducts = (): Product[] => {
  const additionalProducts: Product[] = [];
  
  // Men's additional products
  const menCategories = [
    { category: 'Clothing', subcategory: 'Sweaters', basePrice: 89.99, brand: 'Knit Co' },
    { category: 'Clothing', subcategory: 'Shorts', basePrice: 39.99, brand: 'Summer Wear' },
    { category: 'Footwear', subcategory: 'Sneakers', basePrice: 129.99, brand: 'Sport Style' },
    { category: 'Accessories', subcategory: 'Watches', basePrice: 249.99, brand: 'Time Piece' },
    { category: 'Accessories', subcategory: 'Belts', basePrice: 49.99, brand: 'Leather Craft' }
  ];

  // Women's additional products
  const womenCategories = [
    { category: 'Clothing', subcategory: 'Skirts', basePrice: 59.99, brand: 'Fashion Forward' },
    { category: 'Clothing', subcategory: 'Crop Tops', basePrice: 29.99, brand: 'Trendy Tops' },
    { category: 'Footwear', subcategory: 'Heels', basePrice: 89.99, brand: 'Elegant Steps' },
    { category: 'Accessories', subcategory: 'Jewelry', basePrice: 79.99, brand: 'Sparkle Co' },
    { category: 'Lingerie', subcategory: 'Bras', basePrice: 39.99, brand: 'Comfort Fit' }
  ];

  menCategories.forEach((cat, index) => {
    for (let i = 0; i < 4; i++) {
      additionalProducts.push({
        id: `men-${cat.subcategory.toLowerCase().replace(' ', '-')}-${index + 2}-${i + 1}`,
        name: `${cat.subcategory.slice(0, -1)} Style ${i + 1}`,
        description: `High-quality ${cat.subcategory.toLowerCase()} for men with premium materials and modern design.`,
        price: cat.basePrice + (i * 15),
        originalPrice: cat.basePrice + (i * 15) + 25,
        category: cat.category,
        subcategory: cat.subcategory,
        brand: cat.brand,
        images: [
          `https://images.pexels.com/photos/${1500000 + index * 1000 + i * 100}/pexels-photo-${1500000 + index * 1000 + i * 100}.jpeg?auto=compress&cs=tinysrgb&w=800`
        ],
        colors: ['Black', 'Navy', 'Gray', 'Brown'],
        sizes: cat.subcategory === 'Watches' ? ['One Size'] : ['S', 'M', 'L', 'XL'],
        inStock: Math.random() > 0.1,
        stockCount: Math.floor(Math.random() * 200) + 10,
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
        reviewCount: Math.floor(Math.random() * 300) + 10,
        tags: [cat.subcategory.toLowerCase(), 'men', 'fashion'],
        gender: 'men' as const,
        discount: Math.floor(Math.random() * 30) + 10,
        specifications: {
          'Material': 'Premium Quality',
          'Care': 'Follow Care Instructions',
          'Origin': 'Imported'
        },
        relatedProducts: []
      });
    }
  });

  womenCategories.forEach((cat, index) => {
    for (let i = 0; i < 6; i++) {
      additionalProducts.push({
        id: `women-${cat.subcategory.toLowerCase().replace(' ', '-')}-${index + 2}-${i + 1}`,
        name: `${cat.subcategory.slice(0, -1)} Collection ${i + 1}`,
        description: `Stylish ${cat.subcategory.toLowerCase()} for women featuring contemporary design and premium quality.`,
        price: cat.basePrice + (i * 20),
        originalPrice: cat.basePrice + (i * 20) + 30,
        category: cat.category,
        subcategory: cat.subcategory,
        brand: cat.brand,
        images: [
          `https://images.pexels.com/photos/${2500000 + index * 1000 + i * 100}/pexels-photo-${2500000 + index * 1000 + i * 100}.jpeg?auto=compress&cs=tinysrgb&w=800`
        ],
        colors: ['Black', 'White', 'Red', 'Blue', 'Pink'],
        sizes: cat.subcategory === 'Jewelry' ? ['One Size'] : ['XS', 'S', 'M', 'L', 'XL'],
        inStock: Math.random() > 0.15,
        stockCount: Math.floor(Math.random() * 150) + 5,
        rating: Math.round((Math.random() * 2 + 3.5) * 10) / 10,
        reviewCount: Math.floor(Math.random() * 400) + 20,
        tags: [cat.subcategory.toLowerCase(), 'women', 'fashion'],
        gender: 'women' as const,
        isNew: Math.random() > 0.7,
        isFeatured: Math.random() > 0.8,
        discount: Math.floor(Math.random() * 35) + 10,
        specifications: {
          'Material': 'High Quality',
          'Care': 'Follow Care Instructions',
          'Origin': 'Imported'
        },
        relatedProducts: []
      });
    }
  });

  return additionalProducts;
};

export const allProducts = [...products, ...generateAdditionalProducts()];