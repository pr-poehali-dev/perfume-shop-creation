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
    <SheetContent className="w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle className="text-2xl">Корзина</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <Icon name="ShoppingBag" size={64} className="text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">Корзина пуста</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 -mr-2">
              {cartItems.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-secondary/30 rounded flex items-center justify-center flex-shrink-0">
                        <Icon name="Sparkles" size={24} className="text-accent/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1 truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{item.brand}</p>
                        <p className="text-sm font-bold">{item.price.toLocaleString()} ₽</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="border-t pt-4 mt-4 space-y-4 flex-shrink-0">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Итого:</span>
                <span>{totalPrice.toLocaleString()} ₽</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90" size="lg" onClick={onCheckoutClick}>
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