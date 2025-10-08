import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import PerfumeCard from './PerfumeCard';
import SearchBar from './SearchBar';
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
  volumes: string[];
  selectedVolumes: string[];
  setSelectedVolumes: (volumes: string[]) => void;
  showOnlyAvailable: boolean;
  setShowOnlyAvailable: (show: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  addToCart: (id: number) => void;
  onQuickView: (perfume: Perfume) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  comparison?: number[];
  toggleComparison?: (id: number) => void;
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
  volumes,
  selectedVolumes,
  setSelectedVolumes,
  showOnlyAvailable,
  setShowOnlyAvailable,
  sortBy,
  setSortBy,
  addToCart,
  onQuickView,
  searchQuery,
  setSearchQuery,
  wishlist,
  toggleWishlist,
  comparison = [],
  toggleComparison
}: CatalogSectionProps) => {
  const toggleBrand = (brand: string) => {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter(b => b !== brand)
        : [...selectedBrands, brand]
    );
  };

  const toggleVolume = (volume: string) => {
    setSelectedVolumes(
      selectedVolumes.includes(volume)
        ? selectedVolumes.filter(v => v !== volume)
        : [...selectedVolumes, volume]
    );
  };
  return (
    <section id="catalog" className="py-12 md:py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12">Каталог</h2>
        
        <div className="mb-6 md:mb-8 max-w-2xl mx-auto">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        
        <div className="grid lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            <Card className="p-4 md:p-6">
              <h3 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Категория</h3>
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

            <Card className="p-4 md:p-6">
              <h3 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Цена</h3>
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

            <Card className="p-4 md:p-6">
              <h3 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Бренд</h3>
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

            <Card className="p-4 md:p-6">
              <h3 className="font-semibold mb-3 md:mb-4 text-base md:text-lg">Объём</h3>
              <div className="space-y-3">
                {volumes.map(volume => (
                  <div key={volume} className="flex items-center space-x-2">
                    <Checkbox
                      id={volume}
                      checked={selectedVolumes.includes(volume)}
                      onCheckedChange={() => toggleVolume(volume)}
                    />
                    <Label htmlFor={volume} className="text-sm cursor-pointer">
                      {volume}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 md:p-6">
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
              <p className="text-sm md:text-base text-muted-foreground">
                Найдено: <span className="font-semibold text-foreground">{filteredPerfumes.length}</span> товаров
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Icon name="ArrowUpDown" size={16} className="text-muted-foreground hidden sm:block" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[200px] h-9 text-sm">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredPerfumes.map(perfume => (
                <PerfumeCard 
                  key={perfume.id} 
                  perfume={perfume} 
                  onAddToCart={addToCart}
                  onQuickView={onQuickView}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  comparison={comparison}
                  toggleComparison={toggleComparison}
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