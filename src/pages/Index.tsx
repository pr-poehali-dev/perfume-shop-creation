import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

interface Perfume {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  volume: string;
  notes: string[];
  image: string;
}

const perfumes: Perfume[] = [
  {
    id: 1,
    name: 'Noir Élégance',
    brand: 'Maison Royale',
    price: 12500,
    category: 'Унисекс',
    volume: '100 мл',
    notes: ['Бергамот', 'Роза', 'Пачули'],
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Velvet Dreams',
    brand: 'Parfumerie de Luxe',
    price: 15800,
    category: 'Женский',
    volume: '50 мл',
    notes: ['Ваниль', 'Жасмин', 'Амбра'],
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Royal Oak',
    brand: 'Heritage House',
    price: 18900,
    category: 'Мужской',
    volume: '100 мл',
    notes: ['Дуб', 'Кедр', 'Ветивер'],
    image: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Golden Sunset',
    brand: 'Soleil d\'Or',
    price: 9800,
    category: 'Женский',
    volume: '75 мл',
    notes: ['Цитрус', 'Пион', 'Сандал'],
    image: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Midnight Mystery',
    brand: 'Maison Royale',
    price: 14200,
    category: 'Унисекс',
    volume: '100 мл',
    notes: ['Удовая древесина', 'Кожа', 'Мускус'],
    image: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'Crystal Rose',
    brand: 'Parfumerie de Luxe',
    price: 11500,
    category: 'Женский',
    volume: '50 мл',
    notes: ['Роза', 'Личи', 'Белый чай'],
    image: '/placeholder.svg'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [cart, setCart] = useState<number[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ['Все', 'Мужской', 'Женский', 'Унисекс'];

  const filteredPerfumes = perfumes.filter(perfume => {
    const categoryMatch = selectedCategory === 'Все' || perfume.category === selectedCategory;
    const priceMatch = perfume.price >= priceRange[0] && perfume.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const addToCart = (id: number) => {
    setCart([...cart, id]);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">PARFUMERIE</h1>
            
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>

            <ul className="hidden md:flex gap-8 items-center">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className={`text-sm tracking-wider transition-colors ${activeSection === 'home' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Главная
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('catalog')}
                  className={`text-sm tracking-wider transition-colors ${activeSection === 'catalog' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Каталог
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className={`text-sm tracking-wider transition-colors ${activeSection === 'about' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  О бренде
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('delivery')}
                  className={`text-sm tracking-wider transition-colors ${activeSection === 'delivery' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Доставка
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contacts')}
                  className={`text-sm tracking-wider transition-colors ${activeSection === 'contacts' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Контакты
                </button>
              </li>
              <li>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </li>
            </ul>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fade-in">
              <ul className="flex flex-col gap-4">
                <li><button onClick={() => scrollToSection('home')} className="text-sm tracking-wider">Главная</button></li>
                <li><button onClick={() => scrollToSection('catalog')} className="text-sm tracking-wider">Каталог</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-sm tracking-wider">О бренде</button></li>
                <li><button onClick={() => scrollToSection('delivery')} className="text-sm tracking-wider">Доставка</button></li>
                <li><button onClick={() => scrollToSection('contacts')} className="text-sm tracking-wider">Контакты</button></li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <main className="pt-16">
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-secondary/20" />
          <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Искусство<br />Парфюмерии
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Откройте для себя коллекцию эксклюзивных ароматов от ведущих парфюмерных домов мира
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              onClick={() => scrollToSection('catalog')}
            >
              Перейти в каталог
            </Button>
          </div>
        </section>

        <section id="catalog" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Каталог</h2>
            
            <div className="grid lg:grid-cols-4 gap-8 mb-12">
              <div className="lg:col-span-1 space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 text-lg">Категория</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                          selectedCategory === category 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4 text-lg">Цена</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={20000}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{priceRange[0]} ₽</span>
                      <span>{priceRange[1]} ₽</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPerfumes.map(perfume => (
                    <Card key={perfume.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <div className="aspect-square bg-secondary/30 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon name="Sparkles" size={48} className="text-accent/40" />
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <Badge className="mb-2" variant="secondary">{perfume.category}</Badge>
                        <h3 className="text-xl font-semibold mb-1">{perfume.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{perfume.brand}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {perfume.notes.map((note, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-muted rounded-full">
                              {note}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{perfume.volume}</p>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold">{perfume.price.toLocaleString()} ₽</p>
                          <Button 
                            onClick={() => addToCart(perfume.id)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            В корзину
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">О бренде</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                С 1875 года мы создаём парфюмерные композиции, которые рассказывают истории. 
                Каждый аромат — это результат мастерства наших парфюмеров и использования 
                исключительно натуральных ингредиентов высшего качества.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Мы верим, что парфюм — это не просто аксессуар, а способ самовыражения. 
                Наша миссия — помочь каждому найти аромат, который станет частью его личности.
              </p>
            </div>
          </div>
        </section>

        <section id="delivery" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Доставка</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Быстрая доставка</h3>
                <p className="text-muted-foreground">
                  По Москве — 1-2 дня<br />
                  По России — 3-7 дней
                </p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Гарантия качества</h3>
                <p className="text-muted-foreground">
                  100% оригинальная продукция<br />
                  Сертификаты подлинности
                </p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Gift" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Подарочная упаковка</h3>
                <p className="text-muted-foreground">
                  Бесплатная упаковка<br />
                  К каждому заказу
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Контакты</h2>
            <div className="max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" size={24} className="text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Адрес</h3>
                      <p className="text-muted-foreground">
                        г. Москва, ул. Тверская, д. 1<br />
                        ТЦ "Элегант", 2 этаж
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" size={24} className="text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Телефон</h3>
                      <p className="text-muted-foreground">
                        +7 (495) 123-45-67<br />
                        Ежедневно 10:00 — 22:00
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" size={24} className="text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-muted-foreground">
                        info@parfumerie.ru
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Clock" size={24} className="text-accent mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Режим работы</h3>
                      <p className="text-muted-foreground">
                        Пн-Вс: 10:00 — 22:00<br />
                        Без выходных
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

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
