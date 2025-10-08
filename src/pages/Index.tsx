import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Perfume } from '@/types/perfume';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import InfoSections from '@/components/InfoSections';
import PerfumeQuickView from '@/components/PerfumeQuickView';
import CheckoutModal from '@/components/CheckoutModal';
import WishlistSection from '@/components/WishlistSection';
import Icon from '@/components/ui/icon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
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

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  useScrollAnimation();

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/d898a0d3-06c5-4b2d-a26c-c3b447db586c');
        const data = await response.json();
        setPerfumes(data);
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

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const categories = ['Все', 'Мужской', 'Женский', 'Унисекс'];
  const brands = Array.from(new Set(perfumes.map(p => p.brand)));
  const volumes = Array.from(new Set(perfumes.map(p => p.volume)));

  const filteredPerfumes = perfumes.filter(perfume => {
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
    return 0;
  });

  const addToCart = (id: number) => {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { id, quantity: 1 }]);
    }
    toast({
      title: 'Добавлено в корзину',
      description: 'Товар успешно добавлен',
    });
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

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleQuickView = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsQuickViewOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    toast({
      title: 'Заказ оформлен!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
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
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        onOrderComplete={handleOrderComplete}
      />

      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
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

            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-200">Навигация</h4>
              <ul className="space-y-2 text-rose-100/80">
                <li><a href="#home" className="hover:text-white transition-colors">Главная</a></li>
                <li><a href="#catalog" className="hover:text-white transition-colors">Каталог</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#delivery" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#contacts" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-amber-200">Контакты</h4>
              <ul className="space-y-2 text-rose-100/80">
                <li>+7 (495) 123-45-67</li>
                <li>info@parfumerie.ru</li>
                <li>Москва, ул. Тверская, д. 1</li>
                <li>Ежедневно 10:00 — 22:00</li>
              </ul>
            </div>
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