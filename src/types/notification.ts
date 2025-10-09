export interface Notification {
  id: string;
  type: 'order' | 'discount' | 'delivery' | 'review' | 'wishlist' | 'general';
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
}
