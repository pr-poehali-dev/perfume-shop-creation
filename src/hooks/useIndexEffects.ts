import { useEffect } from 'react';
import { Perfume } from '@/types/perfume';
import { Order } from '@/types/order';
import { Notification } from '@/types/notification';

interface UseIndexEffectsProps {
  wishlist: number[];
  comparison: number[];
  recentlyViewed: number[];
  orders: Order[];
  cart: { id: number; quantity: number }[];
  notifications: Notification[];
  setPerfumes: (perfumes: Perfume[]) => void;
  setLoading: (loading: boolean) => void;
  setCart: (cart: { id: number; quantity: number }[]) => void;
  toast: any;
}

export const useIndexEffects = ({
  wishlist,
  comparison,
  recentlyViewed,
  orders,
  cart,
  notifications,
  setPerfumes,
  setLoading,
  setCart,
  toast,
}: UseIndexEffectsProps) => {
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('comparison', JSON.stringify(comparison));
  }, [comparison]);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const fetchPerfumes = async () => {
      const cached = sessionStorage.getItem('perfumes-cache');
      const cacheTime = sessionStorage.getItem('perfumes-cache-time');
      
      if (cached && cacheTime && Date.now() - parseInt(cacheTime) < 5 * 60 * 1000) {
        setPerfumes(JSON.parse(cached));
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch('https://functions.poehali.dev/d898a0d3-06c5-4b2d-a26c-c3b447db586c');
        const data = await response.json();
        setPerfumes(data);
        sessionStorage.setItem('perfumes-cache', JSON.stringify(data));
        sessionStorage.setItem('perfumes-cache-time', Date.now().toString());
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        toast({
          title: 'Ошибка',
          description: 'Не удалось загрузить товары',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPerfumes();
  }, [toast, setPerfumes, setLoading]);
};
