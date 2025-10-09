import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const interestOptions = [
    { id: 'new', label: 'Новинки', icon: 'Sparkles' },
    { id: 'sales', label: 'Акции и скидки', icon: 'Tag' },
    { id: 'exclusive', label: 'Эксклюзивные ароматы', icon: 'Crown' },
    { id: 'tips', label: 'Советы по выбору', icon: 'Lightbulb' },
  ];

  const handleSubscribe = () => {
    if (!email || !name) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректный email',
        variant: 'destructive',
      });
      return;
    }

    localStorage.setItem('newsletter', JSON.stringify({ email, name, interests }));
    setIsSubscribed(true);

    toast({
      title: 'Спасибо за подписку!',
      description: 'Теперь вы будете получать эксклюзивные предложения',
    });
  };

  const toggleInterest = (id: string) => {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (isSubscribed) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Вы подписаны!</h3>
          <p className="text-muted-foreground">
            Следите за письмами — там будут самые выгодные предложения
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 flex flex-col justify-center">
              <Icon name="Mail" size={48} className="mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                Подпишитесь на рассылку
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Получайте первыми информацию о новинках, эксклюзивных акциях и персональных скидках
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="Gift" size={20} />
                  <span>Скидка 10% на первый заказ</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Star" size={20} />
                  <span>Ранний доступ к распродажам</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Heart" size={20} />
                  <span>Персональные рекомендации</span>
                </div>
              </div>
            </div>

            <CardContent className="p-8 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.ru"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Интересует:</label>
                <div className="space-y-2">
                  {interestOptions.map((option) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <Checkbox
                        id={option.id}
                        checked={interests.includes(option.id)}
                        onCheckedChange={() => toggleInterest(option.id)}
                      />
                      <label
                        htmlFor={option.id}
                        className="text-sm cursor-pointer flex items-center gap-2"
                      >
                        <Icon name={option.icon as any} size={16} />
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleSubscribe}
                className="w-full"
                size="lg"
              >
                <Icon name="Send" size={18} className="mr-2" />
                Подписаться
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
