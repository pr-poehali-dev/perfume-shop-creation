import { Card, CardContent } from '@/components/ui/card';
import { Order } from './OrdersTypes';

interface OrdersStatisticsProps {
  orders: Order[];
}

const OrdersStatistics = ({ orders }: OrdersStatisticsProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Статистика</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{orders.length}</div>
            <div className="text-sm text-muted-foreground">Всего заказов</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === 'pending').length}
            </div>
            <div className="text-sm text-muted-foreground">Ожидают</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()} ₽
            </div>
            <div className="text-sm text-muted-foreground">Общая сумма</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Товаров продано</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrdersStatistics;
