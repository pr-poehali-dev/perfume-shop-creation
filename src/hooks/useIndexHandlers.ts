import { useCallback } from 'react';
import { Perfume, Review } from '@/types/perfume';
import { Order, OrderItem } from '@/types/order';
import { Notification } from '@/types/notification';

interface UseIndexHandlersProps {
  perfumes: Perfume[];
  setPerfumes: (perfumes: Perfume[]) => void;
  wishlist: number[];
  setWishlist: (wishlist: number[]) => void;
  comparison: number[];
  setComparison: (comparison: number[]) => void;
  cart: { id: number; quantity: number }[];
  setCart: (cart: { id: number; quantity: number }[]) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setActiveSection: (section: string) => void;
  setIsMenuOpen: (open: boolean) => void;
  setSelectedPerfume: (perfume: Perfume | null) => void;
  setIsQuickViewOpen: (open: boolean) => void;
  setRecentlyViewed: (viewed: number[]) => void;
  setOrders: (orders: Order[]) => void;
  setNotifications: (notifications: Notification[]) => void;
  setIsAdminOpen: (open: boolean) => void;
  cartItems: any[];
  totalPrice: number;
  toast: any;
}

export const useIndexHandlers = ({
  perfumes,
  setPerfumes,
  wishlist,
  setWishlist,
  comparison,
  setComparison,
  cart,
  setCart,
  setIsCartOpen,
  setIsCheckoutOpen,
  setActiveSection,
  setIsMenuOpen,
  setSelectedPerfume,
  setIsQuickViewOpen,
  setRecentlyViewed,
  setOrders,
  setNotifications,
  setIsAdminOpen,
  cartItems,
  totalPrice,
  toast,
}: UseIndexHandlersProps) => {
  const toggleWishlist = (id: number) => {
    const perfume = perfumes.find(p => p.id === id);
    const isAdding = !wishlist.includes(id);
    
    setWishlist(
      wishlist.includes(id) ? wishlist.filter(item => item !== id) : [...wishlist, id]
    );
    
    toast({
      title: isAdding ? 'Добавлено в избранное' : 'Удалено из избранного',
      description: perfume?.name,
    });

    const newNotification: Notification = {
      id: Date.now().toString(),
      type: 'wishlist',
      title: isAdding ? 'Товар добавлен в избранное' : 'Товар удален из избранного',
      message: perfume?.name || '',
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const toggleComparison = (id: number) => {
    if (comparison.includes(id)) {
      setComparison(comparison.filter(item => item !== id));
      toast({
        title: 'Удалено из сравнения',
      });
    } else if (comparison.length >= 4) {
      toast({
        title: 'Максимум 4 товара',
        description: 'Удалите один товар для добавления нового',
        variant: 'destructive'
      });
    } else {
      setComparison([...comparison, id]);
      toast({
        title: 'Добавлено к сравнению',
      });
    }
  };

  const handleAddReview = useCallback((perfumeId: number, review: Omit<Review, 'id' | 'helpful'>) => {
    setPerfumes(perfumes.map(p => {
      if (p.id === perfumeId) {
        const newReview: Review = {
          ...review,
          id: (p.reviews?.length || 0) + 1,
          helpful: 0
        };
        const updatedReviews = [...(p.reviews || []), newReview];
        const newRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return {
          ...p,
          reviews: updatedReviews,
          rating: newRating,
          reviewsCount: updatedReviews.length
        };
      }
      return p;
    }));
    
    toast({
      title: 'Отзыв добавлен',
      description: 'Спасибо за ваш отзыв!',
    });
  }, [perfumes, setPerfumes, toast]);

  const addToCart = (id: number, showToast = true) => {
    const perfume = perfumes.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id, quantity: 1 }]);
    }
    if (showToast) {
      toast({
        title: 'Добавлено в корзину',
        description: perfume ? `${perfume.name} — ${perfume.price.toLocaleString()} ₽` : 'Товар успешно добавлен',
      });
    }

    const newNotification: Notification = {
      id: Date.now().toString(),
      type: 'order',
      title: 'Товар добавлен в корзину',
      message: perfume?.name || '',
      date: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [setActiveSection, setIsMenuOpen]);

  const handleQuickView = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsQuickViewOpen(true);
    
    setRecentlyViewed(prev => {
      const updated = [perfume.id, ...prev.filter(id => id !== perfume.id)].slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      return updated;
    });
  };

  const handleCheckout = useCallback(() => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, [setIsCartOpen, setIsCheckoutOpen]);

  const handleOrderComplete = useCallback((orderId: string) => {
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString(),
      status: 'pending',
      customer: {
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
        phone: localStorage.getItem('userPhone') || '',
        address: localStorage.getItem('userAddress') || '',
      },
      items: cartItems.map((item): OrderItem => ({
        id: item.id,
        perfumeId: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total: totalPrice,
      paymentMethod: 'card',
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    
    toast({
      title: 'Заказ оформлен!',
      description: `Заказ #${orderId} принят в обработку`,
    });

    const newNotification: Notification = {
      id: Date.now().toString(),
      type: 'order',
      title: 'Заказ успешно оформлен',
      message: `Заказ #${orderId} принят в обработку. Скоро мы свяжемся с вами.`,
      date: new Date().toISOString(),
      read: false,
      actionLabel: 'Посмотреть заказ',
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, [cartItems, totalPrice, toast, setOrders, setCart, setIsCheckoutOpen, setNotifications]);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const openAdminPanel = () => {
    const password = prompt('Введите пароль администратора:');
    if (password === 'admin123') {
      setIsAdminOpen(true);
    } else if (password) {
      toast({
        title: 'Ошибка',
        description: 'Неверный пароль',
        variant: 'destructive'
      });
    }
  };

  return {
    toggleWishlist,
    toggleComparison,
    handleAddReview,
    addToCart,
    removeFromCart,
    updateQuantity,
    scrollToSection,
    handleQuickView,
    handleCheckout,
    handleOrderComplete,
    markNotificationAsRead,
    clearAllNotifications,
    openAdminPanel,
  };
};
