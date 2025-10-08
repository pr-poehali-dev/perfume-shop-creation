import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const InfoSections = () => {
  return (
    <>
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">О бренде</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              С 1875 года мы создаём парфюмерные композиции, которые рассказывают истории. 
              Каждый аромат — это результат мастерства наших парфюмеров и использования 
              исключительно натуральных ингредиентов высшего качества.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Мы верим, что парфюм — это не просто аксессуар, а способ самовыражения. 
              Наша миссия — помочь каждому найти аромат, который станет частью его личности.
            </p>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Доставка</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Быстрая доставка</h3>
              <p className="text-muted-foreground">
                По Москве — 1-2 дня<br />
                По России — 3-7 дней
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Гарантия качества</h3>
              <p className="text-muted-foreground">
                100% оригинальная продукция<br />
                Сертификаты подлинности
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Gift" size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Подарочная упаковка</h3>
              <p className="text-muted-foreground">
                Бесплатная упаковка<br />
                К каждому заказу
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Контакты</h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Адрес</h3>
                    <p className="text-muted-foreground">
                      г. Москва, ул. Тверская, д. 1<br />
                      ТЦ "Элегант", 2 этаж
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Телефон</h3>
                    <p className="text-muted-foreground">
                      +7 (495) 123-45-67<br />
                      Ежедневно 10:00 — 22:00
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      info@parfumerie.ru
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={24} className="text-accent mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Режим работы</h3>
                    <p className="text-muted-foreground">
                      Пн-Вс: 10:00 — 22:00<br />
                      Без выходных
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoSections;
