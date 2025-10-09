import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const InfoSections = () => {
  return (
    <>
      <section id="about" className="py-12 md:py-20 bg-gradient-to-b from-background to-gray-100/20 dark:to-gray-950/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                О нашем бутике
              </h2>
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Место, где встречаются традиции и современность
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-5 md:space-y-6">
                <div className="flex gap-3 md:gap-4 animate-on-scroll">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Star" size={20} className="text-white md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">С 2018 года</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Более полутора веков мы создаём парфюмерные композиции, 
                      которые рассказывают истории и пробуждают эмоции.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 animate-on-scroll" style={{transitionDelay: '0.1s'}}>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Sparkles" size={20} className="text-white md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Мастерство</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Каждый аромат — результат работы лучших парфюмеров 
                      и отбора натуральных ингредиентов высшего качества.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 animate-on-scroll" style={{transitionDelay: '0.2s'}}>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Heart" size={20} className="text-white md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Философия</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Мы верим, что парфюм — это способ самовыражения. 
                      Наша миссия — помочь найти аромат, который станет частью вашей личности.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative animate-on-scroll" style={{transitionDelay: '0.3s'}}>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-gray-900/20 rounded-3xl blur-3xl" />
                <Card className="relative p-6 md:p-8 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-950/20 dark:to-gray-900/20 backdrop-blur border-2 border-gray-200/50 dark:border-gray-800/50">
                  <div className="space-y-6 md:space-y-8">
                    <div className="flex items-center justify-between pb-4 border-b border-rose-200 dark:border-rose-800">
                      <div>
                        <div className="text-4xl font-bold text-rose-600">500+</div>
                        <div className="text-sm text-muted-foreground">Ароматов в каталоге</div>
                      </div>
                      <Icon name="Flame" size={40} className="text-rose-500" />
                    </div>
                    
                    <div className="flex items-center justify-between pb-4 border-b border-amber-200 dark:border-amber-800">
                      <div>
                        <div className="text-4xl font-bold text-amber-600">50+</div>
                        <div className="text-sm text-muted-foreground">Премиум брендов</div>
                      </div>
                      <Icon name="Award" size={40} className="text-amber-500" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">10K+</div>
                        <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                      </div>
                      <Icon name="Users" size={40} className="text-rose-500" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
              Доставка и преимущества
            </h2>
            <p className="text-base md:text-xl text-muted-foreground px-4">
              Мы заботимся о вашем комфорте на каждом этапе
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 hover:border-amber-500/50 group animate-on-scroll">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Icon name="Truck" size={28} className="text-white md:w-9 md:h-9" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Быстрая доставка</h3>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center justify-center gap-2">
                  <Icon name="MapPin" size={16} className="text-amber-500" />
                  <span>По Москве — 1-2 дня</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Icon name="Globe" size={16} className="text-amber-500" />
                  <span>По России — 3-7 дней</span>
                </p>
                <p className="text-sm mt-4 text-amber-600 dark:text-amber-400 font-medium">
                  Бесплатно от 5000 ₽
                </p>
              </div>
            </Card>
            
            <Card className="p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 hover:border-rose-500/50 group animate-on-scroll" style={{transitionDelay: '0.1s'}}>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Icon name="ShieldCheck" size={28} className="text-white md:w-9 md:h-9" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Гарантия качества</h3>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center justify-center gap-2">
                  <Icon name="CheckCircle" size={16} className="text-rose-500" />
                  <span>100% оригинал</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Icon name="FileCheck" size={16} className="text-rose-500" />
                  <span>Сертификаты подлинности</span>
                </p>
                <p className="text-sm mt-4 text-rose-600 dark:text-rose-400 font-medium">
                  Возврат в течение 14 дней
                </p>
              </div>
            </Card>
            
            <Card className="p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-300 border-2 hover:border-amber-500/50 group animate-on-scroll" style={{transitionDelay: '0.2s'}}>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-600 to-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Icon name="Gift" size={28} className="text-white md:w-9 md:h-9" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Подарочная упаковка</h3>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center justify-center gap-2">
                  <Icon name="Package" size={16} className="text-amber-500" />
                  <span>Элегантная упаковка</span>
                </p>
                <p className="flex items-center justify-center gap-2">
                  <Icon name="Ribbon" size={16} className="text-amber-500" />
                  <span>Поздравительная открытка</span>
                </p>
                <p className="text-sm mt-4 text-amber-600 dark:text-amber-400 font-medium">
                  Бесплатно к каждому заказу
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12">Контакты</h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              <Card className="p-5 md:p-6 animate-on-scroll">
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

              <Card className="p-6 animate-on-scroll" style={{transitionDelay: '0.1s'}}>
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

              <Card className="p-6 animate-on-scroll" style={{transitionDelay: '0.2s'}}>
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

              <Card className="p-6 animate-on-scroll" style={{transitionDelay: '0.3s'}}>
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