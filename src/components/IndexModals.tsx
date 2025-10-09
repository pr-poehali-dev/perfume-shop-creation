import { Perfume, Review } from '@/types/perfume';
import { Order } from '@/types/order';
import { Notification } from '@/types/notification';
import PerfumeQuickView from '@/components/PerfumeQuickView';
import ComparisonSection from '@/components/ComparisonSection';
import CheckoutModal from '@/components/CheckoutModal';
import AdminPanel from '@/components/AdminPanel';
import UserProfile from '@/components/UserProfile';
import NotificationCenter from '@/components/NotificationCenter';
import LiveChat from '@/components/LiveChat';

interface IndexModalsProps {
  selectedPerfume: Perfume | null;
  isQuickViewOpen: boolean;
  setIsQuickViewOpen: (open: boolean) => void;
  addToCart: (id: number, showToast?: boolean) => void;
  toggleWishlist: (id: number) => void;
  wishlist: number[];
  toggleComparison: (id: number) => void;
  comparison: number[];
  handleAddReview: (perfumeId: number, review: Omit<Review, 'id' | 'helpful'>) => void;
  perfumes: Perfume[];
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  cartItems: any[];
  totalPrice: number;
  handleOrderComplete: (orderId: string) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  setPerfumes: (perfumes: Perfume[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
}

const IndexModals = ({
  selectedPerfume,
  isQuickViewOpen,
  setIsQuickViewOpen,
  addToCart,
  toggleWishlist,
  wishlist,
  toggleComparison,
  comparison,
  handleAddReview,
  perfumes,
  isCheckoutOpen,
  setIsCheckoutOpen,
  cartItems,
  totalPrice,
  handleOrderComplete,
  isAdminOpen,
  setIsAdminOpen,
  setPerfumes,
  orders,
  setOrders,
  isProfileOpen,
  setIsProfileOpen,
  isNotificationsOpen,
  setIsNotificationsOpen,
  notifications,
  markNotificationAsRead,
  clearAllNotifications,
  isChatOpen,
  setIsChatOpen,
}: IndexModalsProps) => {
  return (
    <>
      <PerfumeQuickView
        perfume={selectedPerfume}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={addToCart}
        toggleWishlist={toggleWishlist}
        wishlist={wishlist}
        toggleComparison={toggleComparison}
        comparison={comparison}
        onAddReview={handleAddReview}
      />

      <ComparisonSection
        perfumes={perfumes}
        comparison={comparison}
        toggleComparison={toggleComparison}
        addToCart={addToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        onOrderComplete={handleOrderComplete}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        perfumes={perfumes}
        setPerfumes={setPerfumes}
        orders={orders}
        setOrders={setOrders}
      />

      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        orders={orders}
      />

      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={markNotificationAsRead}
        onClearAll={clearAllNotifications}
      />

      <LiveChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default IndexModals;
