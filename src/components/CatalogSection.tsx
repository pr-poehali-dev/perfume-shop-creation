import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import PerfumeCard from './PerfumeCard';
import { Perfume } from '@/types/perfume';

interface CatalogSectionProps {
  filteredPerfumes: Perfume[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  brands: string[];
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  showOnlyAvailable: boolean;
  setShowOnlyAvailable: (show: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  addToCart: (id: number) => void;
  onQuickView: (perfume: Perfume) => void;
}

const CatalogSection = ({
  filteredPerfumes,
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  brands,
  selectedBrands,
  setSelectedBrands,
  showOnlyAvailable,
  setShowOnlyAvailable,
  sortBy,
  setSortBy,
  addToCart,
  onQuickView
}: CatalogSectionProps) => {
  const toggleBrand = (brand: string) => {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter(b => b !== brand)
        : [...selectedBrands, brand]
    );
  };
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

            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-lg">Бренд</h3>
              <div className="space-y-3">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => toggleBrand(brand)}
                    />
                    <Label htmlFor={brand} className="text-sm cursor-pointer">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={showOnlyAvailable}
                  onCheckedChange={(checked) => setShowOnlyAvailable(checked as boolean)}
                />
                <Label htmlFor="available" className="text-sm cursor-pointer font-semibold">
                  Только в наличии
                </Label>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Найдено: <span className="font-semibold text-foreground">{filteredPerfumes.length}</span> товаров
              </p>
              <div className="flex items-center gap-2">
                <Icon name="ArrowUpDown" size={18} className="text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Сортировка" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">По умолчанию</SelectItem>
                    <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                    <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                    <SelectItem value="name">По названию</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPerfumes.map(perfume => (
                <PerfumeCard 
                  key={perfume.id} 
                  perfume={perfume} 
                  onAddToCart={addToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
            {filteredPerfumes.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Товары не найдены</p>
                <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить фильтры</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;