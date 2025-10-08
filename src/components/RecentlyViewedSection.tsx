import { Perfume } from '@/types/perfume';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RecentlyViewedSectionProps {
  perfumes: Perfume[];
  recentlyViewed: number[];
  addToCart: (id: number) => void;
  onQuickView: (perfume: Perfume) => void;
  toggleWishlist: (id: number) => void;
  wishlist: number[];
}

const RecentlyViewedSection = ({ 
  perfumes, 
  recentlyViewed, 
  addToCart, 
  onQuickView,
  toggleWishlist,
  wishlist
}: RecentlyViewedSectionProps) => {
  const recentItems = recentlyViewed
    .map(id => perfumes.find(p => p.id === id))
    .filter(Boolean) as Perfume[];

  if (recentItems.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Icon name="Clock" size={28} className="text-primary" />
          <h2 className="text-3xl font-bold">Недавно просмотренные</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {recentItems.slice(0, 5).map((perfume) => (
            <Card key={perfume.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-3">
                <div className="relative mb-3">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-full h-40 object-cover rounded-lg cursor-pointer"
                    onClick={() => onQuickView(perfume)}
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(perfume.id);
                    }}
                  >
                    <Icon 
                      name="Heart" 
                      size={14}
                      className={wishlist.includes(perfume.id) ? 'fill-red-500 text-red-500' : ''}
                    />
                  </Button>
                  {perfume.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{perfume.discount}%
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">{perfume.name}</h3>
                    <p className="text-xs text-muted-foreground">{perfume.brand}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {perfume.discount ? (
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground line-through">
                            {perfume.price.toLocaleString()} ₽
                          </span>
                          <span className="font-bold text-red-600">
                            {Math.round(perfume.price * (1 - perfume.discount / 100)).toLocaleString()} ₽
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold text-sm">{perfume.price.toLocaleString()} ₽</span>
                      )}
                    </div>
                  </div>

                  <Button 
                    size="sm"
                    className="w-full"
                    onClick={() => addToCart(perfume.id)}
                    disabled={!perfume.availability}
                  >
                    <Icon name="ShoppingCart" size={14} className="mr-1" />
                    {perfume.availability ? 'В корзину' : 'Нет в наличии'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedSection;
