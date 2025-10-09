interface IndexFooterProps {
  scrollToSection: (sectionId: string) => void;
}

const IndexFooter = ({ scrollToSection }: IndexFooterProps) => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              PARFUMERIE
            </h3>
            <p className="text-rose-100/80 leading-relaxed">
              Элитная парфюмерия с 1875 года. Откройте мир изысканных ароматов.
            </p>
          </div>

          <nav aria-label="Футер навигация">
            <h4 className="text-lg font-bold mb-4 text-amber-200">Навигация</h4>
            <ul className="space-y-2 text-rose-100/80">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors text-left">Главная</button></li>
              <li><button onClick={() => scrollToSection('catalog')} className="hover:text-white transition-colors text-left">Каталог</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors text-left">О нас</button></li>
              <li><button onClick={() => scrollToSection('delivery')} className="hover:text-white transition-colors text-left">Доставка</button></li>
              <li><button onClick={() => scrollToSection('contacts')} className="hover:text-white transition-colors text-left">Контакты</button></li>
            </ul>
          </nav>

          <address className="not-italic">
            <h4 className="text-lg font-bold mb-4 text-amber-200">Контакты</h4>
            <ul className="space-y-2 text-rose-100/80">
              <li><a href="tel:+74951234567" className="hover:text-white transition-colors">+7 (495) 123-45-67</a></li>
              <li><a href="mailto:info@parfumerie.ru" className="hover:text-white transition-colors">info@parfumerie.ru</a></li>
              <li>Москва, ул. Тверская, д. 1</li>
              <li>Ежедневно 10:00 — 22:00</li>
            </ul>
          </address>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-rose-100/60">
          <p>© 2024 PARFUMERIE. Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};

export default IndexFooter;
