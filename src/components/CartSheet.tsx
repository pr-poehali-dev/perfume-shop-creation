import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

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

interface CartSheetProps {
  cartItems: Array<Perfume & { quantity: number }>;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  totalPrice: number;
  onCheckoutClick: () => void;
}

const CartSheet = ({ cartItems, removeFromCart, updateQuantity, totalPrice, onCheckoutClick }: CartSheetProps) => {
  return (
    <SheetContent className="w-full sm:max-w-lg p-4 md:p-6">
      <SheetHeader>
        <SheetTitle className="text-xl md:text-2xl">Корзина</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col h-[calc(100vh-7rem)] md:h-[calc(100vh-8rem)]">
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <Icon name="ShoppingBag" size={48} className="text-muted-foreground mb-3 md:mb-4 md:w-16 md:h-16" />
            <p className="text-base md:text-lg text-muted-foreground">Корзина пуста</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4 pr-1 md:pr-2 -mr-1 md:-mr-2 mt-4">
              {cartItems.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-3 md:p-4">
                    <div className="flex gap-3 md:gap-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary/30 rounded flex items-center justify-center flex-shrink-0">
                        <Icon name="Sparkles" size={20} className="text-accent/40 md:w-6 md:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs md:text-sm mb-1 line-clamp-2">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mb-1 md:mb-2">{item.brand}</p>
                        <p className="text-sm md:text-base font-bold">{item.price.toLocaleString()} ₽</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 md:h-7 md:w-7"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="X" size={14} className="md:w-4 md:h-4" />
                        </Button>
                        <div className="flex items-center gap-1 md:gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 md:h-8 md:w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={12} className="md:w-[14px] md:h-[14px]" />
                          </Button>
                          <span className="text-xs md:text-sm font-medium w-5 md:w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 md:h-8 md:w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={12} className="md:w-[14px] md:h-[14px]" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="border-t pt-3 md:pt-4 mt-3 md:mt-4 space-y-3 md:space-y-4 flex-shrink-0">
              <div className="flex justify-between items-center text-base md:text-lg font-semibold">
                <span>Итого:</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 h-11 md:h-12 text-sm md:text-base" onClick={onCheckoutClick}>
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </div>
    </SheetContent>
  );
};

export default CartSheet;