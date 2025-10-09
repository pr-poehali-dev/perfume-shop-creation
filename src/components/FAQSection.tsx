import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Как оформить заказ?',
      answer: 'Добавьте товары в корзину, нажмите "Оформить заказ", заполните данные доставки и выберите способ оплаты. Мы свяжемся с вами для подтверждения.',
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Мы принимаем банковские карты (Visa, MasterCard, МИР), электронные кошельки, а также оплату наличными или картой при получении.',
    },
    {
      question: 'Условия доставки',
      answer: 'Доставка по Москве — бесплатно от 3000₽, до 3000₽ — 300₽. По России — от 300₽, срок 3-7 рабочих дней. Курьерская служба работает ежедневно с 10:00 до 22:00.',
    },
    {
      question: 'Можно ли вернуть товар?',
      answer: 'Возврат парфюмерии возможен в течение 14 дней с момента покупки при условии сохранения целостности упаковки и отсутствия следов использования.',
    },
    {
      question: 'Как проверить подлинность?',
      answer: 'Все товары сертифицированы и поставляются напрямую от официальных дистрибьюторов. К каждому флакону прилагается сертификат подлинности.',
    },
    {
      question: 'Есть ли программа лояльности?',
      answer: 'Да! За каждую покупку начисляются бонусные баллы (5% от суммы), которые можно использовать для оплаты следующих заказов. Также доступны эксклюзивные промокоды.',
    },
    {
      question: 'Как узнать статус заказа?',
      answer: 'Информация о статусе заказа доступна в личном кабинете. Также мы отправляем SMS и email уведомления на каждом этапе обработки заказа.',
    },
    {
      question: 'Можно ли протестировать аромат перед покупкой?',
      answer: 'В нашем магазине на Тверской улице доступны пробники всех ароматов. Также мы отправляем бесплатные пробники с каждым заказом.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
          <p className="text-muted-foreground text-lg">
            Ответы на популярные вопросы о покупке и доставке
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`overflow-hidden transition-all ${
                openIndex === index ? 'shadow-lg' : 'hover:shadow-md'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 transition-colors hover:bg-muted/50"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <Icon
                  name="ChevronDown"
                  size={20}
                  className={`flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <CardContent className="pt-0 pb-6 px-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Не нашли ответ на свой вопрос?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline">
              <Icon name="Mail" size={18} className="mr-2" />
              info@parfumerie.ru
            </Button>
            <Button variant="outline">
              <Icon name="Phone" size={18} className="mr-2" />
              +7 (495) 123-45-67
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
