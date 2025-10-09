import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface LoyaltySystemProps {
  totalSpent: number;
  orderCount: number;
}

const LoyaltySystem = ({ totalSpent, orderCount }: LoyaltySystemProps) => {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('loyaltyPoints');
    return saved ? parseInt(saved) : Math.floor(totalSpent * 0.05);
  });

  useEffect(() => {
    const calculatedPoints = Math.floor(totalSpent * 0.05);
    setPoints(calculatedPoints);
    localStorage.setItem('loyaltyPoints', calculatedPoints.toString());
  }, [totalSpent]);

  const tiers = [
    { name: 'Бронза', min: 0, max: 10000, discount: 5, color: 'from-amber-700 to-amber-500' },
    { name: 'Серебро', min: 10000, max: 30000, discount: 10, color: 'from-gray-400 to-gray-200' },
    { name: 'Золото', min: 30000, max: 50000, discount: 15, color: 'from-yellow-500 to-yellow-300' },
    { name: 'Платина', min: 50000, max: Infinity, discount: 20, color: 'from-purple-500 to-purple-300' },
  ];

  const currentTier = tiers.find(t => totalSpent >= t.min && totalSpent < t.max) || tiers[0];
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const progress = nextTier 
    ? ((totalSpent - currentTier.min) / (nextTier.min - currentTier.min)) * 100
    : 100;

  const benefits = [
    { icon: 'Gift', text: 'Бонусы за каждую покупку', active: true },
    { icon: 'Tag', text: `Скидка ${currentTier.discount}% на все товары`, active: true },
    { icon: 'Truck', text: 'Бесплатная доставка', active: totalSpent >= 10000 },
    { icon: 'Calendar', text: 'Ранний доступ к акциям', active: totalSpent >= 30000 },
    { icon: 'Star', text: 'Персональный менеджер', active: totalSpent >= 50000 },
  ];

  return (
    <Card className="overflow-hidden">
      <div className={`bg-gradient-to-r ${currentTier.color} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90">Ваш статус</p>
            <h3 className="text-3xl font-bold">{currentTier.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Бонусные баллы</p>
            <p className="text-3xl font-bold">{points.toLocaleString()}</p>
          </div>
        </div>

        {nextTier && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm opacity-90">
              <span>До статуса {nextTier.name}</span>
              <span>{(nextTier.min - totalSpent).toLocaleString()} ₽</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/30" />
          </div>
        )}
      </div>

      <CardContent className="p-6 space-y-6">
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Icon name="Award" size={20} className="text-primary" />
            Ваши привилегии
          </h4>
          <div className="space-y-2">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-2 rounded transition-colors ${
                  benefit.active ? 'text-foreground' : 'text-muted-foreground opacity-60'
                }`}
              >
                <Icon
                  name={benefit.icon as any}
                  size={18}
                  className={benefit.active ? 'text-primary' : 'text-muted-foreground'}
                />
                <span className="text-sm">{benefit.text}</span>
                {benefit.active && (
                  <Icon name="Check" size={16} className="ml-auto text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h5 className="font-semibold mb-2 text-sm">Как использовать баллы?</h5>
          <p className="text-sm text-muted-foreground mb-3">
            1 балл = 1 рубль. Используйте до 30% от суммы заказа.
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary">Можно списать: до {Math.floor(points * 0.3)} ₽</Badge>
          </div>
        </div>

        <div className="border-t pt-4">
          <h5 className="font-semibold mb-3 text-sm">Дополнительные бонусы</h5>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">За отзыв с фото</span>
              <Badge>+100 баллов</Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">В день рождения</span>
              <Badge>+500 баллов</Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">За друга</span>
              <Badge>+1000 баллов</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltySystem;
