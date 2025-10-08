import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-secondary/20" />
      <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Искусство<br />Парфюмерии
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Откройте для себя коллекцию эксклюзивных ароматов от ведущих парфюмерных домов мира
        </p>
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          onClick={() => scrollToSection('catalog')}
        >
          Перейти в каталог
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
