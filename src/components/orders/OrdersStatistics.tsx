import { Card, CardContent } from '@/components/ui/card';
import { Order } from './OrdersTypes';

interface OrdersStatisticsProps {
  orders: Order[];
}

const OrdersStatistics = ({ orders }: OrdersStatisticsProps) => {
  const newOrders = orders.filter(o => o.status === 'Новый').length;
  const processingOrders = orders.filter(o => o.status === 'В обработке').length;
  const deliveryOrders = orders.filter(o => o.status === 'Доставляется').length;
  const completedOrders = orders.filter(o => o.status === 'Завершён').length;
  const totalRevenue = orders.filter(o => o.status === 'Завершён').reduce((sum, o) => sum + o.totalAmount, 0);
  const averageOrder = orders.length > 0 ? Math.round(orders.reduce((sum, o) => sum + o.totalAmount, 0) / orders.length) : 0;
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Статистика</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{orders.length}</div>
            <div className="text-sm text-muted-foreground">Всего заказов</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-700">{newOrders}</div>
            <div className="text-sm text-orange-600">Новые</div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-700">{processingOrders}</div>
            <div className="text-sm text-blue-600">В обработке</div>
          </CardContent>
        </Card>
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-700">{deliveryOrders}</div>
            <div className="text-sm text-purple-600">Доставляются</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-700">{completedOrders}</div>
            <div className="text-sm text-green-600">Завершены</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Товаров</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()} ₽
            </div>
            <div className="text-sm text-muted-foreground">Общая сумма всех заказов</div>
          </CardContent>
        </Card>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-700">
              {totalRevenue.toLocaleString()} ₽
            </div>
            <div className="text-sm text-green-600">Выручка (завершённые)</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrdersStatistics;