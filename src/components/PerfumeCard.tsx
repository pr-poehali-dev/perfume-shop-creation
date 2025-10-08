import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Perfume } from '@/types/perfume';
import WishlistButton from './WishlistButton';

interface PerfumeCardProps {
  perfume: Perfume;
  onAddToCart: (id: number) => void;
  onQuickView: (perfume: Perfume) => void;
}

const PerfumeCard = ({ perfume, onAddToCart, onQuickView }: PerfumeCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 hover:border-accent/30">
      <div className="aspect-square bg-gradient-to-br from-gray-800/40 to-gray-900/20 relative overflow-hidden cursor-pointer" onClick={() => onQuickView(perfume)}>
        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <Icon name="Sparkles" size={64} className="text-accent/30 group-hover:text-accent/50 transition-colors" />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
            <Icon name="Eye" size={24} className="text-primary" />
          </div>
        </div>
        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">{perfume.category}</Badge>
        <div className="absolute top-4 left-4">
          <WishlistButton perfumeId={perfume.id} />
        </div>
      </div>
      <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 group-hover:text-accent transition-colors line-clamp-2">{perfume.name}</h3>
          <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">{perfume.brand}</p>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {perfume.notes.slice(0, 3).map((note, index) => (
            <span key={index} className="text-xs px-2 md:px-3 py-1 bg-muted/50 rounded-full border border-muted-foreground/20">
              {note}
            </span>
          ))}
          {perfume.notes.length > 3 && (
            <span className="text-xs px-2 md:px-3 py-1 bg-muted/50 rounded-full border border-muted-foreground/20">
              +{perfume.notes.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-baseline gap-2">
          <p className="text-xs md:text-sm text-muted-foreground">{perfume.volume}</p>
        </div>
        
        <div className="pt-3 md:pt-4 border-t space-y-2 md:space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Цена</p>
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                {perfume.price.toLocaleString()}
                <span className="text-base md:text-lg ml-1">₽</span>
              </p>
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
            >
              <Icon name="ShoppingCart" size={14} className="mr-1.5 md:w-4 md:h-4" />
              <span>В корзину</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerfumeCard;