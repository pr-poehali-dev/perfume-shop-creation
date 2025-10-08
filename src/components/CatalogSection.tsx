import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import PerfumeCard from './PerfumeCard';
import { Perfume } from '@/types/perfume';

interface CatalogSectionProps {
  filteredPerfumes: Perfume[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  addToCart: (id: number) => void;
}

const CatalogSection = ({
  filteredPerfumes,
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  addToCart
}: CatalogSectionProps) => {
  return (
    <section id="catalog" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Каталог</h2>
        
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-lg">Категория</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      selectedCategory === category 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-lg">Цена</h3>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={20000}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0]} ₽</span>
                  <span>{priceRange[1]} ₽</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPerfumes.map(perfume => (
                <PerfumeCard 
                  key={perfume.id} 
                  perfume={perfume} 
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
