import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-background to-gray-800/10" />
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent px-4">
              Искусство
              <br />
              Парфюмерии
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Откройте для себя мир изысканных ароматов от легендарных парфюмерных домов.
              <br className="hidden md:block" />
              Каждый флакон — история, воплощенная в аромате.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-8 py-5 md:px-10 md:py-6 text-base md:text-lg shadow-xl w-full sm:w-auto group"
                onClick={() => scrollToSection('catalog')}
              >
                <Icon name="ShoppingBag" size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                Перейти в каталог
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-5 md:px-10 md:py-6 text-base md:text-lg border-2 w-full sm:w-auto group"
                onClick={() => scrollToSection('about')}
              >
                <Icon name="Info" size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                О нас
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-20 animate-fade-in px-4">
            <div className="text-center p-5 md:p-6 bg-card/50 backdrop-blur rounded-2xl border border-border/50 hover:border-rose-500/50 transition-all">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Icon name="Award" size={24} className="text-white md:w-7 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Премиум качество</h3>
              <p className="text-sm md:text-base text-muted-foreground">Только оригинальная продукция от мировых брендов</p>
            </div>

            <div className="text-center p-5 md:p-6 bg-card/50 backdrop-blur rounded-2xl border border-border/50 hover:border-amber-500/50 transition-all">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Icon name="Truck" size={24} className="text-white md:w-7 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Быстрая доставка</h3>
              <p className="text-sm md:text-base text-muted-foreground">Доставим ваш заказ в течение 1-3 дней</p>
            </div>

            <div className="text-center p-5 md:p-6 bg-card/50 backdrop-blur rounded-2xl border border-border/50 hover:border-rose-500/50 transition-all">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Icon name="Gift" size={24} className="text-white md:w-7 md:h-7" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Подарочная упаковка</h3>
              <p className="text-sm md:text-base text-muted-foreground">Бесплатная упаковка для каждого заказа</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;