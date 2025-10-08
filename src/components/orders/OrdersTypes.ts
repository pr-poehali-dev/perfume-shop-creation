export interface OrderItem {
  perfumeId: number;
  perfumeName: string;
  perfumeBrand: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryMethod: string;
  deliveryAddress: string;
  city: string;
  postalCode: string;
  comment: string;
  paymentMethod: string;
  totalAmount: number;
  deliveryPrice: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}
