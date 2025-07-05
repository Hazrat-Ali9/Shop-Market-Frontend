import { Banner } from '../types';
// banner ts
export const banners: Banner[] = [
  {
    id: 'banner-1',
    title: 'Summer Collection 2024',
    subtitle: 'Discover the latest trends in summer fashion',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200',
    link: '/products?category=summer',
    buttonText: 'Shop Now',
    isActive: true
  },
  {
    id: 'banner-2',
    title: 'Men\'s Premium Collection',
    subtitle: 'Elevate your style with our premium menswear',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200',
    link: '/men',
    buttonText: 'Explore Men\'s',
    isActive: true
  },
  {
    id: 'banner-3',
    title: 'Women\'s Exclusive Deals',
    subtitle: 'Up to 50% off on selected women\'s fashion',
    image: 'https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=1200',
    link: '/women',
    buttonText: 'Shop Women\'s',
    isActive: true
  },
  {
    id: 'banner-4',
    title: 'New Arrivals',
    subtitle: 'Be the first to wear the latest fashion trends',
    image: 'https://images.pexels.com/photos/2827400/pexels-photo-2827400.jpeg?auto=compress&cs=tinysrgb&w=1200',
    link: '/products?filter=new',
    buttonText: 'View New',
    isActive: true
  }
];