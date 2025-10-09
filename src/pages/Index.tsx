import { useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useIndexState } from '@/hooks/useIndexState';
import { useIndexEffects } from '@/hooks/useIndexEffects';
import { useIndexHandlers } from '@/hooks/useIndexHandlers';
import Header from '@/components/Header';
import IndexMainContent from '@/components/IndexMainContent';
import IndexModals from '@/components/IndexModals';
import IndexFloatingButtons from '@/components/IndexFloatingButtons';
import IndexFooter from '@/components/IndexFooter';

const Index = () => {
  const { toast } = useToast();
  const state = useIndexState();

  const {
    activeSection,
    recentlyViewed,
    selectedCategory,
    priceRange,
    selectedBrands,
    selectedVolumes,
    showOnlyAvailable,
    sortBy,
    cart,
    isCartOpen,
    isMenuOpen,
    selectedPerfume,
    isQuickViewOpen,
    perfumes,
    loading,
    isCheckoutOpen,
    searchQuery,
    wishlist,
    comparison,
    orders,
    isAdminOpen,
    isProfileOpen,
    notifications,
    isNotificationsOpen,
    isChatOpen,
    promoEndDate,
    setSelectedCategory,
    setPriceRange,
    setSelectedBrands,
    setSelectedVolumes,
    setShowOnlyAvailable,
    setSortBy,
    setIsCartOpen,
    setIsMenuOpen,
    setIsQuickViewOpen,
    setPerfumes,
    setLoading,
    setIsCheckoutOpen,
    setSearchQuery,
    setOrders,
    setIsAdminOpen,
    setIsProfileOpen,
    setIsNotificationsOpen,
    setIsChatOpen,
    setCart,
    setActiveSection,
    setSelectedPerfume,
    setRecentlyViewed,
    setWishlist,
    setComparison,
    setNotifications,
  } = state;

  useScrollAnimation();

  useIndexEffects({
    wishlist,
    comparison,
    recentlyViewed,
    orders,
    cart,
    notifications,
    setPerfumes,
    setLoading,
    setCart,
    toast,
  });

  const categories = useMemo(() => ['Все', 'Мужской', 'Женский', 'Унисекс'], []);
  const brands = useMemo(() => Array.from(new Set(perfumes.map(p => p.brand))), [perfumes]);
  const volumes = useMemo(() => Array.from(new Set(perfumes.map(p => p.volume))), [perfumes]);

  const filteredPerfumes = useMemo(() => {
    return perfumes.filter(perfume => {
      const categoryMatch = selectedCategory === 'Все' || perfume.category === selectedCategory;
      const priceMatch = perfume.price >= priceRange[0] && perfume.price <= priceRange[1];
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(perfume.brand);
      const volumeMatch = selectedVolumes.length === 0 || selectedVolumes.includes(perfume.volume);
      const availabilityMatch = !showOnlyAvailable || perfume.availability;
      const searchMatch = !searchQuery || 
        perfume.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        perfume.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && priceMatch && brandMatch && volumeMatch && availabilityMatch && searchMatch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
      return 0;
    });
  }, [perfumes, selectedCategory, priceRange, selectedBrands, selectedVolumes, showOnlyAvailable, searchQuery, sortBy]);

  const cartItems = cart.map(item => ({
    ...perfumes.find(p => p.id === item.id)!,
    quantity: item.quantity
  }));

  const totalPrice = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handlers = useIndexHandlers({
    perfumes,
    setPerfumes,
    wishlist,
    setWishlist,
    comparison,
    setComparison,
    cart,
    setCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    setActiveSection,
    setIsMenuOpen,
    setSelectedPerfume,
    setIsQuickViewOpen,
    setRecentlyViewed,
    setOrders,
    setNotifications,
    setIsAdminOpen,
    cartItems,
    totalPrice,
    toast,
  });

  const {
    toggleWishlist,
    toggleComparison,
    handleAddReview,
    addToCart,
    removeFromCart,
    updateQuantity,
    scrollToSection,
    handleQuickView,
    handleCheckout,
    handleOrderComplete,
    markNotificationAsRead,
    clearAllNotifications,
    openAdminPanel,
  } = handlers;

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        totalItems={totalItems}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalPrice={totalPrice}
        onCheckoutClick={handleCheckout}
      />

      <IndexMainContent
        scrollToSection={scrollToSection}
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
        handleQuickView={handleQuickView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        comparison={comparison}
        toggleComparison={toggleComparison}
        perfumes={perfumes}
        recentlyViewed={recentlyViewed}
        cart={cart}
        promoEndDate={promoEndDate}
      />

      <IndexModals
        selectedPerfume={selectedPerfume}
        isQuickViewOpen={isQuickViewOpen}
        setIsQuickViewOpen={setIsQuickViewOpen}
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
        wishlist={wishlist}
        toggleComparison={toggleComparison}
        comparison={comparison}
        handleAddReview={handleAddReview}
        perfumes={perfumes}
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleOrderComplete={handleOrderComplete}
        isAdminOpen={isAdminOpen}
        setIsAdminOpen={setIsAdminOpen}
        setPerfumes={setPerfumes}
        orders={orders}
        setOrders={setOrders}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        isNotificationsOpen={isNotificationsOpen}
        setIsNotificationsOpen={setIsNotificationsOpen}
        notifications={notifications}
        markNotificationAsRead={markNotificationAsRead}
        clearAllNotifications={clearAllNotifications}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />

      <IndexFloatingButtons
        setIsNotificationsOpen={setIsNotificationsOpen}
        unreadNotificationsCount={unreadNotificationsCount}
        setIsChatOpen={setIsChatOpen}
        setIsProfileOpen={setIsProfileOpen}
        openAdminPanel={openAdminPanel}
        setIsAdminOpen={setIsAdminOpen}
      />

      <IndexFooter scrollToSection={scrollToSection} />
    </div>
  );
};

export default Index;
