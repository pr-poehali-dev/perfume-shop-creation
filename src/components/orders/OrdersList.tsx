import { Card, CardContent } from '@/components/ui/card';
import OrderCard from './OrderCard';
import { Order } from './OrdersTypes';

interface OrdersListProps {
  orders: Order[];
  onStatusChange: (orderId: number, newStatus: string) => void;
  onEdit: (order: Order) => void;
  onDelete: (orderId: number) => void;
}

const OrdersList = ({ orders, onStatusChange, onEdit, onDelete }: OrdersListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Заказы</h2>
      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Заказов пока нет
          </CardContent>
        </Card>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default OrdersList;
