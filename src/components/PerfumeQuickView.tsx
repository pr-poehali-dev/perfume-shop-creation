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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold">{perfume.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-4 md:mt-6">
          <div className="aspect-square bg-gradient-to-br from-gray-800/40 to-gray-900/20 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="Sparkles" size={80} className="text-accent/30 md:w-[120px] md:h-[120px]" />
            </div>
            <Badge className="absolute top-3 right-3 md:top-4 md:right-4 bg-primary/90 backdrop-blur-sm text-sm md:text-lg px-3 py-1 md:px-4 md:py-2">
              {perfume.category}
            </Badge>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">Бренд</p>
              <p className="text-lg md:text-xl font-semibold">{perfume.brand}</p>
            </div>

            <Separator />

            <div>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">Объём</p>
              <p className="text-base md:text-lg font-medium">{perfume.volume}</p>
            </div>

            <Separator />

            <div>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">Описание</p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Изысканный аромат от {perfume.brand}, созданный для тех, кто ценит качество и элегантность. 
                Этот парфюм создаёт неповторимую композицию, 
                которая подчеркнёт вашу индивидуальность.
              </p>
            </div>

            <Separator />

            <div className="space-y-3 md:space-y-4 pt-2 md:pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Цена</p>
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    {perfume.price.toLocaleString()}
                    <span className="text-xl md:text-2xl ml-1 md:ml-2">₽</span>
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  onAddToCart(perfume.id);
                  onClose();
                }}
                className="w-full bg-primary hover:bg-primary/90 h-11 md:h-12 text-sm md:text-base"
              >
                <Icon name="ShoppingCart" size={18} className="mr-2 md:w-5 md:h-5" />
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