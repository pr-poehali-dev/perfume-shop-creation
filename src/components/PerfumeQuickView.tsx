import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Perfume } from '@/types/perfume';

interface PerfumeQuickViewProps {
  perfume: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (id: number) => void;
}

const PerfumeQuickView = ({ perfume, isOpen, onClose, onAddToCart }: PerfumeQuickViewProps) => {
  if (!perfume) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">{perfume.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="aspect-square bg-gradient-to-br from-gray-800/40 to-gray-900/20 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="Sparkles" size={120} className="text-accent/30" />
            </div>
            <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-lg px-4 py-2">
              {perfume.category}
            </Badge>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Бренд</p>
              <p className="text-xl font-semibold">{perfume.brand}</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3">Ноты аромата</p>
              <div className="flex flex-wrap gap-2">
                {perfume.notes.map((note, index) => (
                  <span key={index} className="text-sm px-4 py-2 bg-muted rounded-full border border-muted-foreground/20">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Объём</p>
              <p className="text-lg font-medium">{perfume.volume}</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Описание</p>
              <p className="text-muted-foreground leading-relaxed">
                Изысканный аромат от {perfume.brand}, созданный для тех, кто ценит качество и элегантность. 
                Сочетание {perfume.notes.join(', ').toLowerCase()} создаёт неповторимую композицию, 
                которая подчеркнёт вашу индивидуальность.
              </p>
            </div>

            <Separator />

            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Цена</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    {perfume.price.toLocaleString()}
                    <span className="text-2xl ml-2">₽</span>
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  onAddToCart(perfume.id);
                  onClose();
                }}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Добавить в корзину
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PerfumeQuickView;