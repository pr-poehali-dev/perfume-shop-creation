import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Perfume, Review } from '@/types/perfume';
import { Order, OrderItem } from '@/types/order';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import InfoSections from '@/components/InfoSections';
import PerfumeQuickView from '@/components/PerfumeQuickView';
import CheckoutModal from '@/components/CheckoutModal';
import WishlistSection from '@/components/WishlistSection';
import RecentlyViewedSection from '@/components/RecentlyViewedSection';
import ComparisonSection from '@/components/ComparisonSection';
import AdminPanel from '@/components/AdminPanel';
import UserProfile from '@/components/UserProfile';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
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
  const { toast } = useToast();
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
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleWishlist = (id: number) => {
    const perfume = perfumes.find(p => p.id === id);
    const isAdding = !wishlist.includes(id);
    
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    
    toast({
      title: isAdding ? 'Добавлено в избранное' : 'Удалено из избранного',
      description: perfume?.name,
    });
  };

  const toggleComparison = (id: number) => {
    if (comparison.includes(id)) {
      setComparison(prev => prev.filter(item => item !== id));
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
      setComparison(prev => [...prev, id]);
      toast({
        title: 'Добавлено к сравнению',
      });
    }
  };

  const handleAddReview = useCallback((perfumeId: number, review: Omit<Review, 'id' | 'helpful'>) => {
    setPerfumes(prev => prev.map(p => {
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
  }, [toast]);

  useScrollAnimation();

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
  }, [toast]);

  const categories = useMemo(() => ['Все', 'Мужской', 'Женский', 'Унисекс'], []);
  const brands = useMemo(() => Array.from(new Set(perfumes.map(p => p.brand))), [perfumes]);
  const volumes = useMemo(() => Array.from(new Set(perfumes.map(p => p.volume))), [perfumes]);

  const filteredPerfumes = useMemo(() => {
    return perfumes.filter(perfume => {
      const categoryMatch = selectedCategory === 'Все' || perfume.category === selectedCategory;
      const priceMatch = perfume.price >= priceRange[0] && perfume.price <= priceRange[1];
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(perfume.brand);
      const volumeMatch = selectedVolumes.length === 0 || selectedVolumes.includes(perfume.volume);
      const availabilityMatch = !showOnlyAvailable || perfume.availability;
      const searchMatch = !searchQuery || 
        perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        perfume.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && priceMatch && brandMatch && volumeMatch && availabilityMatch && searchMatch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
      return 0;
    });
  }, [perfumes, selectedCategory, priceRange, selectedBrands, selectedVolumes, showOnlyAvailable, searchQuery, sortBy]);

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

  const cartItems = cart.map(item => ({
    ...perfumes.find(p => p.id === item.id)!,
    quantity: item.quantity
  }));

  const totalPrice = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }, []);

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
  }, []);

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
  }, [cartItems, totalPrice, toast]);

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



  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        totalItems={totalItems}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalPrice={totalPrice}
        onCheckoutClick={handleCheckout}
      />

      <main className="pt-16">
        <HeroSection scrollToSection={scrollToSection} />
        
        <CatalogSection
          filteredPerfumes={filteredPerfumes}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          brands={brands}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          volumes={volumes}
          selectedVolumes={selectedVolumes}
          setSelectedVolumes={setSelectedVolumes}
          showOnlyAvailable={showOnlyAvailable}
          setShowOnlyAvailable={setShowOnlyAvailable}
          sortBy={sortBy}
          setSortBy={setSortBy}
          addToCart={addToCart}
          onQuickView={handleQuickView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          comparison={comparison}
          toggleComparison={toggleComparison}
        />

        <RecentlyViewedSection
          perfumes={perfumes}
          recentlyViewed={recentlyViewed}
          addToCart={addToCart}
          onQuickView={handleQuickView}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />

        <WishlistSection 
          perfumes={perfumes}
          addToCart={addToCart}
          onQuickView={handleQuickView}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />

        <InfoSections />
      </main>

      <PerfumeQuickView
        perfume={selectedPerfume}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={addToCart}
        toggleWishlist={toggleWishlist}
        wishlist={wishlist}
        toggleComparison={toggleComparison}
        comparison={comparison}
        onAddReview={handleAddReview}
      />

      <ComparisonSection
        perfumes={perfumes}
        comparison={comparison}
        toggleComparison={toggleComparison}
        addToCart={addToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        onOrderComplete={handleOrderComplete}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        perfumes={perfumes}
        setPerfumes={setPerfumes}
        orders={orders}
        setOrders={setOrders}
      />

      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        orders={orders}
      />

      <Button
        onClick={() => setIsProfileOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-2xl"
        title="Личный кабинет"
      >
        <Icon name="User" size={20} />
      </Button>

      <Button
        onClick={openAdminPanel}
        variant="outline"
        className="fixed bottom-24 right-6 z-40 h-12 w-12 rounded-full shadow-xl hidden"
        title="Админ-панель"
        onDoubleClick={() => setIsAdminOpen(true)}
      >
        <Icon name="Settings" size={18} />
      </Button>

      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                PARFUMERIE
              </h3>
              <p className="text-rose-100/80 leading-relaxed">
                Элитная парфюмерия с 1875 года. Откройте мир изысканных ароматов.
              </p>
            </div>

            <nav aria-label="Футер навигация">
              <h4 className="text-lg font-bold mb-4 text-amber-200">Навигация</h4>
              <ul className="space-y-2 text-rose-100/80">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors text-left">Главная</button></li>
                <li><button onClick={() => scrollToSection('catalog')} className="hover:text-white transition-colors text-left">Каталог</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors text-left">О нас</button></li>
                <li><button onClick={() => scrollToSection('delivery')} className="hover:text-white transition-colors text-left">Доставка</button></li>
                <li><button onClick={() => scrollToSection('contacts')} className="hover:text-white transition-colors text-left">Контакты</button></li>
              </ul>
            </nav>

            <address className="not-italic">
              <h4 className="text-lg font-bold mb-4 text-amber-200">Контакты</h4>
              <ul className="space-y-2 text-rose-100/80">
                <li><a href="tel:+74951234567" className="hover:text-white transition-colors">+7 (495) 123-45-67</a></li>
                <li><a href="mailto:info@parfumerie.ru" className="hover:text-white transition-colors">info@parfumerie.ru</a></li>
                <li>Москва, ул. Тверская, д. 1</li>
                <li>Ежедневно 10:00 — 22:00</li>
              </ul>
            </address>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-rose-100/60">
            <p>© 2024 PARFUMERIE. Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;