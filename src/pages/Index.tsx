import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Perfume } from '@/types/perfume';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import InfoSections from '@/components/InfoSections';
import PerfumeQuickView from '@/components/PerfumeQuickView';

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

  const categories = ['Все', 'Мужской', 'Женский', 'Унисекс'];
  const brands = Array.from(new Set(perfumes.map(p => p.brand)));
  const volumes = Array.from(new Set(perfumes.map(p => p.volume)));

  const filteredPerfumes = perfumes.filter(perfume => {
    const categoryMatch = selectedCategory === 'Все' || perfume.category === selectedCategory;
    const priceMatch = perfume.price >= priceRange[0] && perfume.price <= priceRange[1];
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(perfume.brand);
    const volumeMatch = selectedVolumes.length === 0 || selectedVolumes.includes(perfume.volume);
    const availabilityMatch = !showOnlyAvailable || perfume.availability;
    return categoryMatch && priceMatch && brandMatch && volumeMatch && availabilityMatch;
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
        />

        <InfoSections />
      </main>

      <PerfumeQuickView
        perfume={selectedPerfume}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={addToCart}
      />

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">PARFUMERIE</h2>
          <p className="text-sm opacity-80">
            © 2024 Все права защищены
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;