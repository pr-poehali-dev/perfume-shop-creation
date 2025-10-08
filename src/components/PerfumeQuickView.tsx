import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Perfume, Review } from '@/types/perfume';
import ReviewsSection from './ReviewsSection';

interface PerfumeQuickViewProps {
  perfume: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (id: number) => void;
  toggleWishlist?: (id: number) => void;
  wishlist?: number[];
  toggleComparison?: (id: number) => void;
  comparison?: number[];
  onAddReview?: (perfumeId: number, review: Omit<Review, 'id' | 'helpful'>) => void;
}

const PerfumeQuickView = ({ 
  perfume, 
  isOpen, 
  onClose, 
  onAddToCart,
  toggleWishlist,
  wishlist = [],
  toggleComparison,
  comparison = [],
  onAddReview
}: PerfumeQuickViewProps) => {
  const [quantity, setQuantity] = useState(1);
  
  if (!perfume) return null;

  const isInWishlist = wishlist.includes(perfume.id);
  const isInComparison = comparison.includes(perfume.id);
  const finalPrice = perfume.discount 
    ? Math.round(perfume.price * (1 - perfume.discount / 100))
    : perfume.price;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl md:text-3xl font-bold">{perfume.name}</DialogTitle>
              {perfume.rating && perfume.reviewsCount && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={16}
                        className={star <= Math.round(perfume.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {perfume.rating.toFixed(1)} ({perfume.reviewsCount} отзывов)
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {toggleWishlist && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleWishlist(perfume.id)}
                >
                  <Icon 
                    name="Heart" 
                    size={16} 
                    className={isInWishlist ? 'fill-red-500 text-red-500' : ''}
                  />
                </Button>
              )}
              {toggleComparison && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleComparison(perfume.id)}
                >
                  <Icon 
                    name="GitCompare" 
                    size={16}
                    className={isInComparison ? 'text-primary' : ''}
                  />
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-4 md:mt-6">
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-gray-800/40 to-gray-900/20 rounded-lg relative overflow-hidden">
              <img 
                src={perfume.image} 
                alt={perfume.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-3 right-3 md:top-4 md:right-4 bg-primary/90 backdrop-blur-sm text-sm md:text-lg px-3 py-1 md:px-4 md:py-2">
                {perfume.category}
              </Badge>
              {perfume.discount && (
                <Badge className="absolute top-3 left-3 md:top-4 md:left-4 bg-red-500 backdrop-blur-sm text-sm md:text-lg px-3 py-1 md:px-4 md:py-2">
                  -{perfume.discount}%
                </Badge>
              )}
              {!perfume.availability && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    Нет в наличии
                  </Badge>
                </div>
              )}
            </div>
            
            <div>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">Парфюмерные ноты</p>
              <div className="flex flex-wrap gap-2">
                {perfume.notes.map((note, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {note}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">Бренд</p>
              <p className="text-lg md:text-xl font-semibold">{perfume.brand}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">Объём</p>
                <p className="text-base md:text-lg font-medium">{perfume.volume}</p>
              </div>
              {perfume.concentration && (
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">Концентрация</p>
                  <p className="text-base md:text-lg font-medium">{perfume.concentration}</p>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-2">Описание</p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {perfume.description || `Изысканный аромат от ${perfume.brand}, созданный для тех, кто ценит качество и элегантность. Этот парфюм создаёт неповторимую композицию, которая подчеркнёт вашу индивидуальность.`}
              </p>
            </div>

            <Separator />

            <div className="space-y-3 md:space-y-4 pt-2 md:pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">Цена</p>
                  {perfume.discount ? (
                    <div className="flex items-baseline gap-3">
                      <p className="text-3xl md:text-4xl font-bold text-red-600">
                        {finalPrice.toLocaleString()}
                        <span className="text-xl md:text-2xl ml-1 md:ml-2">₽</span>
                      </p>
                      <p className="text-lg md:text-xl text-muted-foreground line-through">
                        {perfume.price.toLocaleString()} ₽
                      </p>
                    </div>
                  ) : (
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                      {perfume.price.toLocaleString()}
                      <span className="text-xl md:text-2xl ml-1 md:ml-2">₽</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Итого:</p>
                  <p className="text-xl font-bold">{(finalPrice * quantity).toLocaleString()} ₽</p>
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    onAddToCart(perfume.id, i === 0);
                  }
                  onClose();
                }}
                className="w-full bg-primary hover:bg-primary/90 h-11 md:h-12 text-sm md:text-base"
                disabled={!perfume.availability}
              >
                <Icon name="ShoppingCart" size={18} className="mr-2 md:w-5 md:h-5" />
                {perfume.availability ? 'Добавить в корзину' : 'Нет в наличии'}
              </Button>
            </div>
          </div>
        </div>

        {perfume.reviews && onAddReview && (
          <Separator className="my-6" />
        )}

        {perfume.reviews && onAddReview && (
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Информация</TabsTrigger>
              <TabsTrigger value="reviews">
                Отзывы ({perfume.reviews.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold mb-2">О парфюме</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {perfume.description || `Изысканный аромат от ${perfume.brand}, созданный для тех, кто ценит качество и элегантность. Этот парфюм создаёт неповторимую композицию, которая подчеркнёт вашу индивидуальность.`}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Характеристики</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Категория</p>
                    <p className="font-medium">{perfume.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Бренд</p>
                    <p className="font-medium">{perfume.brand}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Объём</p>
                    <p className="font-medium">{perfume.volume}</p>
                  </div>
                  {perfume.concentration && (
                    <div>
                      <p className="text-muted-foreground">Концентрация</p>
                      <p className="font-medium">{perfume.concentration}</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <ReviewsSection 
                perfumeId={perfume.id}
                reviews={perfume.reviews}
                onAddReview={onAddReview}
              />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PerfumeQuickView;