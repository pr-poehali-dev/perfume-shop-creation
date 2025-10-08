import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Perfume } from '@/types/perfume';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: (Perfume & { quantity: number })[];
  totalPrice: number;
  onOrderComplete: (orderId: string) => void;
}

const CheckoutModal = ({ isOpen, onClose, cartItems, totalPrice, onOrderComplete }: CheckoutModalProps) => {
  const [step, setStep] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number} | null>(null);
  const [formData, setFormData] = useState({
    name: localStorage.getItem('userName') || '',
    phone: localStorage.getItem('userPhone') || '',
    email: localStorage.getItem('userEmail') || '',
    address: localStorage.getItem('userAddress') || '',
    city: '',
    postalCode: '',
    comment: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card'
  });

  const promoCodes: Record<string, number> = {
    'WELCOME10': 10,
    'SALE20': 20,
    'VIP30': 30,
  };

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        name: localStorage.getItem('userName') || prev.name,
        phone: localStorage.getItem('userPhone') || prev.phone,
        email: localStorage.getItem('userEmail') || prev.email,
        address: localStorage.getItem('userAddress') || prev.address,
      }));
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const applyPromoCode = () => {
    const discount = promoCodes[promoCode.toUpperCase()];
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount });
    } else {
      setAppliedPromo(null);
    }
  };

  const handleSubmit = async () => {
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userPhone', formData.phone);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userAddress', formData.address);

    const orderId = 'ORD-' + Date.now();
    onOrderComplete(orderId);
    setStep(1);
    setPromoCode('');
    setAppliedPromo(null);
  };

  const deliveryPrice = formData.deliveryMethod === 'courier' ? (totalPrice >= 5000 ? 0 : 500) : 300;
  const discount = appliedPromo ? Math.round(totalPrice * appliedPromo.discount / 100) : 0;
  const finalTotal = totalPrice - discount + deliveryPrice;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold">Оформление заказа</DialogTitle>
        </DialogHeader>

        <div className="mt-3 md:mt-4">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-primary text-white' : 'bg-muted'}`}>1</div>
              <span className="text-xs md:text-sm font-medium hidden sm:inline">Контакты</span>
            </div>
            <div className="flex-1 h-0.5 bg-muted mx-2 md:mx-4" />
            <div className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-primary text-white' : 'bg-muted'}`}>2</div>
              <span className="text-xs md:text-sm font-medium hidden sm:inline">Доставка</span>
            </div>
            <div className="flex-1 h-0.5 bg-muted mx-2 md:mx-4" />
            <div className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm ${step >= 3 ? 'bg-primary text-white' : 'bg-muted'}`}>3</div>
              <span className="text-xs md:text-sm font-medium hidden sm:inline">Подтверждение</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-3 md:space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm md:text-base">Имя и фамилия *</Label>
                <Input
                  id="name"
                  className="h-10 md:h-11 text-sm md:text-base"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Иван Иванов"
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm md:text-base">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  className="h-10 md:h-11 text-sm md:text-base"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  required
                  autoComplete="tel"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm md:text-base">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  className="h-10 md:h-11 text-sm md:text-base"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@mail.ru"
                  required
                  autoComplete="email"
                />
              </div>
              <Button 
                onClick={() => setStep(2)} 
                className="w-full h-10 md:h-11 text-sm md:text-base"
                disabled={!formData.name || !formData.phone || !formData.email}
              >
                Далее
                <Icon name="ArrowRight" size={16} className="ml-2 md:w-[18px] md:h-[18px]" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 md:space-y-6">
              <div>
                <Label className="mb-2 md:mb-3 block text-sm md:text-base">Способ доставки</Label>
                <RadioGroup value={formData.deliveryMethod} onValueChange={(value) => handleInputChange('deliveryMethod', value)}>
                  <div className="flex items-start space-x-2 md:space-x-3 border rounded-lg p-3 md:p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="courier" id="courier" className="mt-0.5" />
                    <Label htmlFor="courier" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Truck" size={16} className="md:w-[18px] md:h-[18px]" />
                        <span className="font-medium text-sm md:text-base">Курьерская доставка</span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">1-3 дня, {totalPrice >= 5000 ? 'бесплатно' : '500 ₽'}</p>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2 md:space-x-3 border rounded-lg p-3 md:p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="pickup" id="pickup" className="mt-0.5" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Store" size={16} className="md:w-[18px] md:h-[18px]" />
                        <span className="font-medium text-sm md:text-base">Самовывоз</span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">Сегодня, 300 ₽</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.deliveryMethod === 'courier' && (
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <Label htmlFor="city" className="text-sm md:text-base">Город *</Label>
                    <Input
                      id="city"
                      className="h-10 md:h-11 text-sm md:text-base"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Москва"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-sm md:text-base">Адрес *</Label>
                    <Input
                      id="address"
                      className="h-10 md:h-11 text-sm md:text-base"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="ул. Тверская, д. 1, кв. 1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-sm md:text-base">Индекс</Label>
                    <Input
                      id="postalCode"
                      className="h-10 md:h-11 text-sm md:text-base"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="123456"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="comment" className="text-sm md:text-base">Комментарий к заказу</Label>
                <Textarea
                  id="comment"
                  className="text-sm md:text-base"
                  value={formData.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  placeholder="Дополнительные пожелания..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 md:gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1 h-10 md:h-11 text-sm md:text-base">
                  <Icon name="ArrowLeft" size={16} className="mr-1 md:mr-2 md:w-[18px] md:h-[18px]" />
                  <span className="hidden sm:inline">Назад</span>
                  <Icon name="ArrowLeft" size={16} className="sm:hidden" />
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  className="flex-1 h-10 md:h-11 text-sm md:text-base"
                  disabled={formData.deliveryMethod === 'courier' && (!formData.city || !formData.address)}
                >
                  <span className="hidden sm:inline">Далее</span>
                  <Icon name="ArrowRight" size={16} className="ml-1 md:ml-2 md:w-[18px] md:h-[18px]" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 md:space-y-6">
              <div>
                <Label className="mb-2 md:mb-3 block text-sm md:text-base">Способ оплаты</Label>
                <RadioGroup value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                  <div className="flex items-start space-x-2 md:space-x-3 border rounded-lg p-3 md:p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="card" id="card" className="mt-0.5" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="CreditCard" size={16} className="md:w-[18px] md:h-[18px]" />
                        <span className="font-medium text-sm md:text-base">Картой онлайн</span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">Visa, Mastercard, МИР</p>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2 md:space-x-3 border rounded-lg p-3 md:p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="cash" id="cash" className="mt-0.5" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Wallet" size={16} className="md:w-[18px] md:h-[18px]" />
                        <span className="font-medium text-sm md:text-base">Наличными при получении</span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">Оплата курьеру</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Ваш заказ</h3>
                <div className="space-y-2 md:space-y-3 max-h-40 md:max-h-48 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs md:text-sm gap-2">
                      <span className="text-muted-foreground line-clamp-1 flex-1">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium whitespace-nowrap">{(item.price * item.quantity).toLocaleString()} ₽</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm md:text-base mb-2">Промокод</Label>
                <div className="flex gap-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Введите промокод"
                    className="h-9 text-sm"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={applyPromoCode}
                    className="whitespace-nowrap"
                  >
                    Применить
                  </Button>
                </div>
                {appliedPromo && (
                  <p className="text-xs text-green-600 mt-1">
                    Промокод {appliedPromo.code} применён (-{appliedPromo.discount}%)
                  </p>
                )}
                {promoCode && !appliedPromo && promoCodes[promoCode.toUpperCase()] === undefined && (
                  <p className="text-xs text-red-600 mt-1">
                    Неверный промокод
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Доступные: WELCOME10, SALE20, VIP30
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Товары</span>
                  <span>{totalPrice.toLocaleString()} ₽</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-xs md:text-sm text-green-600">
                    <span>Скидка ({appliedPromo.discount}%)</span>
                    <span>-{discount.toLocaleString()} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>{deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base md:text-lg font-bold">
                  <span>Итого</span>
                  <span>{finalTotal.toLocaleString()} ₽</span>
                </div>
              </div>

              <div className="flex gap-2 md:gap-3">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1 h-10 md:h-11 text-sm md:text-base">
                  <Icon name="ArrowLeft" size={16} className="mr-1 md:mr-2 md:w-[18px] md:h-[18px]" />
                  <span className="hidden sm:inline">Назад</span>
                  <Icon name="ArrowLeft" size={16} className="sm:hidden" />
                </Button>
                <Button onClick={handleSubmit} className="flex-1 bg-primary hover:bg-primary/90 h-10 md:h-11 text-xs md:text-base">
                  <Icon name="Check" size={16} className="mr-1 md:mr-2 md:w-[18px] md:h-[18px]" />
                  <span className="hidden xs:inline">Оформить заказ</span>
                  <span className="xs:hidden">Оформить</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;