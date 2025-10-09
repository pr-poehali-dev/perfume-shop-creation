import { Perfume } from '@/types/perfume';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import RecentlyViewedSection from '@/components/RecentlyViewedSection';
import PromoTimer from '@/components/PromoTimer';
import RecommendationEngine from '@/components/RecommendationEngine';
import WishlistSection from '@/components/WishlistSection';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import FAQSection from '@/components/FAQSection';
import InfoSections from '@/components/InfoSections';

interface IndexMainContentProps {
  scrollToSection: (sectionId: string) => void;
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
  addToCart: (id: number, showToast?: boolean) => void;
  handleQuickView: (perfume: Perfume) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  comparison: number[];
  toggleComparison: (id: number) => void;
  perfumes: Perfume[];
  recentlyViewed: number[];
  cart: { id: number; quantity: number }[];
  promoEndDate: string;
}

const IndexMainContent = ({
  scrollToSection,
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
  handleQuickView,
  searchQuery,
  setSearchQuery,
  wishlist,
  toggleWishlist,
  comparison,
  toggleComparison,
  perfumes,
  recentlyViewed,
  cart,
  promoEndDate,
}: IndexMainContentProps) => {
  return (
    <main className="pt-16">
      <HeroSection scrollToSection={scrollToSection} />
      
      <CatalogSection
        filteredPerfumes={filteredPerfumes}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        brands={brands}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        volumes={volumes}
        selectedVolumes={selectedVolumes}
        setSelectedVolumes={setSelectedVolumes}
        showOnlyAvailable={showOnlyAvailable}
        setShowOnlyAvailable={setShowOnlyAvailable}
        sortBy={sortBy}
        setSortBy={setSortBy}
        addToCart={addToCart}
        onQuickView={handleQuickView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        comparison={comparison}
        toggleComparison={toggleComparison}
      />

      <RecentlyViewedSection
        perfumes={perfumes}
        recentlyViewed={recentlyViewed}
        addToCart={addToCart}
        onQuickView={handleQuickView}
        toggleWishlist={toggleWishlist}
        wishlist={wishlist}
      />

      <div className="container mx-auto px-4 my-8">
        <PromoTimer
          endDate={promoEndDate}
          title="Флеш-распродажа"
          discount={30}
        />
      </div>

      <RecommendationEngine
        perfumes={perfumes}
        cart={cart}
        wishlist={wishlist}
        recentlyViewed={recentlyViewed}
        onAddToCart={addToCart}
        onQuickView={handleQuickView}
      />

      <WishlistSection 
        perfumes={perfumes}
        addToCart={addToCart}
        onQuickView={handleQuickView}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
      />

      <NewsletterSubscription />

      <FAQSection />

      <InfoSections />
    </main>
  );
};

export default IndexMainContent;
