
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import PerfumeCard from './PerfumeCard';
import { Perfume } from '@/types/perfume';

interface WishlistSectionProps {
  perfumes: Perfume[];
  addToCart: (id: number) => void;
  onQuickView: (perfume: Perfume) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}

const WishlistSection = ({ perfumes, addToCart, onQuickView, wishlist, toggleWishlist }: WishlistSectionProps) => {
  const wishlistPerfumes = perfumes.filter(p => wishlist.includes(p.id));

  const clearWishlist = () => {
    wishlistPerfumes.forEach(p => toggleWishlist(p.id));
  };

  return (
    <section id="wishlist" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Избранное</h2>
            <p className="text-muted-foreground">
              {wishlistPerfumes.length > 0 
                ? `${wishlistPerfumes.length} ${wishlistPerfumes.length === 1 ? 'товар' : wishlistPerfumes.length < 5 ? 'товара' : 'товаров'}`
                : 'Вы пока ничего не добавили в избранное'}
            </p>
          </div>
          {wishlistPerfumes.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearWishlist}
              className="gap-2"
            >
              <Icon name="Trash2" size={18} />
              Очистить всё
            </Button>
          )}
        </div>

        {wishlistPerfumes.length === 0 ? (
          <Card className="p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <Icon name="Heart" size={64} className="text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Список избранного пуст</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Добавляйте товары в избранное, нажимая на иконку сердечка на карточках товаров
              </p>
              <Button onClick={() => {
                const catalogElement = document.getElementById('catalog');
                catalogElement?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Icon name="ShoppingBag" size={18} className="mr-2" />
                Перейти в каталог
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistPerfumes.map(perfume => (
              <PerfumeCard
                key={perfume.id}
                perfume={perfume}
                onAddToCart={addToCart}
                onQuickView={onQuickView}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistSection;