import { useState } from 'react';
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
  onOrderComplete: () => void;
}

const CheckoutModal = ({ isOpen, onClose, cartItems, totalPrice, onOrderComplete }: CheckoutModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    comment: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onOrderComplete();
    setStep(1);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      comment: '',
      deliveryMethod: 'courier',
      paymentMethod: 'card'
    });
  };

  const deliveryPrice = formData.deliveryMethod === 'courier' ? (totalPrice >= 5000 ? 0 : 500) : 300;
  const finalTotal = totalPrice + deliveryPrice;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Оформление заказа</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-muted'}`}>1</div>
              <span className="text-sm font-medium">Контакты</span>
            </div>
            <div className="flex-1 h-0.5 bg-muted mx-4" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-muted'}`}>2</div>
              <span className="text-sm font-medium">Доставка</span>
            </div>
            <div className="flex-1 h-0.5 bg-muted mx-4" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-muted'}`}>3</div>
              <span className="text-sm font-medium">Подтверждение</span>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Имя и фамилия *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Иван Иванов"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="example@mail.ru"
                />
              </div>
              <Button 
                onClick={() => setStep(2)} 
                className="w-full"
                disabled={!formData.name || !formData.phone || !formData.email}
              >
                Далее
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Способ доставки</Label>
                <RadioGroup value={formData.deliveryMethod} onValueChange={(value) => handleInputChange('deliveryMethod', value)}>
                  <div className="flex items-start space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="courier" id="courier" />
                    <Label htmlFor="courier" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Truck" size={18} />
                        <span className="font-medium">Курьерская доставка</span>
                      </div>
                      <p className="text-sm text-muted-foreground">1-3 дня, {totalPrice >= 5000 ? 'бесплатно' : '500 ₽'}</p>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Store" size={18} />
                        <span className="font-medium">Самовывоз</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Сегодня, 300 ₽</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.deliveryMethod === 'courier' && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="city">Город *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Москва"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Адрес *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="ул. Тверская, д. 1, кв. 1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Индекс</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="123456"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="comment">Комментарий к заказу</Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  placeholder="Дополнительные пожелания..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Назад
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  className="flex-1"
                  disabled={formData.deliveryMethod === 'courier' && (!formData.city || !formData.address)}
                >
                  Далее
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Способ оплаты</Label>
                <RadioGroup value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                  <div className="flex items-start space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="CreditCard" size={18} />
                        <span className="font-medium">Картой онлайн</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, МИР</p>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 border rounded-lg p-4 hover:border-primary transition-colors">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Wallet" size={18} />
                        <span className="font-medium">Наличными при получении</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Оплата курьеру</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-4">Ваш заказ</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">{(item.price * item.quantity).toLocaleString()} ₽</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары</span>
                  <span>{totalPrice.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>{deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого</span>
                  <span>{finalTotal.toLocaleString()} ₽</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                  <Icon name="ArrowLeft" size={18} className="mr-2" />
                  Назад
                </Button>
                <Button onClick={handleSubmit} className="flex-1 bg-primary hover:bg-primary/90">
                  <Icon name="Check" size={18} className="mr-2" />
                  Оформить заказ
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
