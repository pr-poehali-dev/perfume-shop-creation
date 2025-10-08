import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Perfume } from '@/types/perfume';

interface PerfumeCardProps {
  perfume: Perfume;
  onAddToCart: (id: number) => void;
  onQuickView: (perfume: Perfume) => void;
}

const PerfumeCard = ({ perfume, onAddToCart, onQuickView }: PerfumeCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 hover:border-accent/30">
      <div className="aspect-square bg-gradient-to-br from-secondary/40 to-secondary/20 relative overflow-hidden cursor-pointer" onClick={() => onQuickView(perfume)}>
        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <Icon name="Sparkles" size={64} className="text-accent/30 group-hover:text-accent/50 transition-colors" />
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
            <Icon name="Eye" size={24} className="text-primary" />
          </div>
        </div>
        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">{perfume.category}</Badge>
      </div>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">{perfume.name}</h3>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">{perfume.brand}</p>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {perfume.notes.map((note, index) => (
            <span key={index} className="text-xs px-3 py-1 bg-muted/50 rounded-full border border-muted-foreground/20">
              {note}
            </span>
          ))}
        </div>
        
        <div className="flex items-baseline gap-2">
          <p className="text-sm text-muted-foreground">{perfume.volume}</p>
        </div>
        
        <div className="pt-4 border-t space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Цена</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {perfume.price.toLocaleString()}
                <span className="text-lg ml-1">₽</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => onQuickView(perfume)}
              variant="outline"
              size="icon"
              className="group-hover:scale-105 transition-transform flex-shrink-0"
            >
              <Icon name="Eye" size={18} />
            </Button>
            <Button 
              onClick={() => onAddToCart(perfume.id)}
              className="bg-primary hover:bg-primary/90 group-hover:scale-105 transition-transform flex-1"
              size="lg"
            >
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              В корзину
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerfumeCard;