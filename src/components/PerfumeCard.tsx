import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Perfume } from '@/types/perfume';

interface PerfumeCardProps {
  perfume: Perfume;
  onAddToCart: (id: number) => void;
  onQuickView: (perfume: Perfume) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  comparison?: number[];
  toggleComparison?: (id: number) => void;
}

const PerfumeCard = ({ 
  perfume, 
  onAddToCart, 
  onQuickView, 
  wishlist, 
  toggleWishlist,
  comparison = [],
  toggleComparison
}: PerfumeCardProps) => {
  const isInWishlist = wishlist.includes(perfume.id);
  const isInComparison = comparison.includes(perfume.id);
  const finalPrice = perfume.discount 
    ? Math.round(perfume.price * (1 - perfume.discount / 100))
    : perfume.price;
  
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 hover:border-accent/30">
      <div className="aspect-square bg-gradient-to-br from-gray-800/40 to-gray-900/20 relative overflow-hidden cursor-pointer" onClick={() => onQuickView(perfume)}>
        <img 
          src={perfume.image} 
          alt={perfume.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
            <Icon name="Eye" size={24} className="text-primary" />
          </div>
        </div>
        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">{perfume.category}</Badge>
        {perfume.discount && (
          <Badge className="absolute top-14 right-4 bg-red-500/90 backdrop-blur-sm">
            -{perfume.discount}%
          </Badge>
        )}
        {!perfume.availability && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              Нет в наличии
            </Badge>
          </div>
        )}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(perfume.id);
            }}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all hover:scale-110 shadow-lg"
            aria-label={isInWishlist ? 'Удалить из избранного' : 'Добавить в избранное'}
          >
            <Icon 
              name="Heart" 
              size={18} 
              className={`transition-colors ${
                isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
          {toggleComparison && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleComparison(perfume.id);
              }}
              className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all hover:scale-110 shadow-lg"
              aria-label={isInComparison ? 'Удалить из сравнения' : 'Добавить к сравнению'}
            >
              <Icon 
                name="GitCompare" 
                size={18} 
                className={`transition-colors ${
                  isInComparison ? 'text-primary' : 'text-gray-600'
                }`}
              />
            </button>
          )}
        </div>
      </div>
      <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 group-hover:text-accent transition-colors line-clamp-2">{perfume.name}</h3>
          <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">{perfume.brand}</p>
          <p className="text-xs md:text-sm text-muted-foreground">{perfume.volume}</p>
        </div>
        
        <div className="pt-3 md:pt-4 border-t space-y-2 md:space-y-3">
          {perfume.rating && perfume.reviewsCount && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={14}
                    className={star <= Math.round(perfume.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {perfume.rating.toFixed(1)} ({perfume.reviewsCount})
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Цена</p>
              {perfume.discount ? (
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-red-600">
                    {finalPrice.toLocaleString()}
                    <span className="text-base md:text-lg ml-1">₽</span>
                  </p>
                  <p className="text-sm text-muted-foreground line-through">
                    {perfume.price.toLocaleString()} ₽
                  </p>
                </div>
              ) : (
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                  {perfume.price.toLocaleString()}
                  <span className="text-base md:text-lg ml-1">₽</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => onQuickView(perfume)}
              variant="outline"
              size="icon"
              className="group-hover:scale-105 transition-transform flex-shrink-0 h-9 w-9 md:h-10 md:w-10"
            >
              <Icon name="Eye" size={16} className="md:w-[18px] md:h-[18px]" />
            </Button>
            <Button 
              onClick={() => onAddToCart(perfume.id)}
              className="bg-primary hover:bg-primary/90 group-hover:scale-105 transition-transform flex-1 px-3 py-2 h-9 md:h-auto text-xs md:text-sm"
              disabled={!perfume.availability}
              title={!perfume.availability ? 'Товар отсутствует в наличии' : 'Добавить в корзину'}
            >
              <Icon name="ShoppingCart" size={14} className="mr-1.5 md:w-4 md:h-4" />
              <span>{perfume.availability ? 'В корзину' : 'Нет в наличии'}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerfumeCard;