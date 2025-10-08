import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import CartSheet from './CartSheet';

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

interface HeaderProps {
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  scrollToSection: (sectionId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (value: boolean) => void;
  totalItems: number;
  cartItems: Array<Perfume & { quantity: number }>;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  totalPrice: number;
  onCheckoutClick: () => void;
}

const Header = ({
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  isCartOpen,
  setIsCartOpen,
  totalItems,
  cartItems,
  removeFromCart,
  updateQuantity,
  totalPrice,
  onCheckoutClick
}: HeaderProps) => {
  return (
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
              <button 
                onClick={() => scrollToSection('wishlist')}
                className={`text-sm tracking-wider transition-colors ${activeSection === 'wishlist' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Избранное
              </button>
            </li>
            <li>
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingBag" size={20} />
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <CartSheet
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  totalPrice={totalPrice}
                  onCheckoutClick={onCheckoutClick}
                />
              </Sheet>
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
              <li><button onClick={() => scrollToSection('wishlist')} className="text-sm tracking-wider">Избранное</button></li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;