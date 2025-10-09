import { useState } from 'react';
import { Perfume } from '@/types/perfume';
import { Order } from '@/types/order';

export const useIndexState = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedVolumes, setSelectedVolumes] = useState<string[]>([]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<string>('default');
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [comparison, setComparison] = useState<number[]>(() => {
    const saved = localStorage.getItem('comparison');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  return {
    activeSection, setActiveSection,
    recentlyViewed, setRecentlyViewed,
    selectedCategory, setSelectedCategory,
    priceRange, setPriceRange,
    selectedBrands, setSelectedBrands,
    selectedVolumes, setSelectedVolumes,
    showOnlyAvailable, setShowOnlyAvailable,
    sortBy, setSortBy,
    cart, setCart,
    isCartOpen, setIsCartOpen,
    isMenuOpen, setIsMenuOpen,
    selectedPerfume, setSelectedPerfume,
    isQuickViewOpen, setIsQuickViewOpen,
    perfumes, setPerfumes,
    loading, setLoading,
    isCheckoutOpen, setIsCheckoutOpen,
    searchQuery, setSearchQuery,
    wishlist, setWishlist,
    comparison, setComparison,
    orders, setOrders,
    isAdminOpen, setIsAdminOpen,
    isProfileOpen, setIsProfileOpen,
    adminPassword, setAdminPassword,
    isChatOpen, setIsChatOpen,
  };
};
