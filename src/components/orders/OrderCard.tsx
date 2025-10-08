import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Order } from './OrdersTypes';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: number, newStatus: string) => void;
  onEdit: (order: Order) => void;
  onDelete: (orderId: number) => void;
}

const OrderCard = ({ order, onStatusChange, onEdit, onDelete }: OrderCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Заказ {order.orderNumber}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={order.status} onValueChange={(value) => onStatusChange(order.id, value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Ожидает</SelectItem>
                <SelectItem value="processing">В обработке</SelectItem>
                <SelectItem value="completed">Выполнен</SelectItem>
                <SelectItem value="cancelled">Отменён</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Icon name="User" size={16} />
              Клиент
            </h4>
            <div className="text-sm space-y-1">
              <p>{order.customerName}</p>
              <p className="text-muted-foreground">{order.customerPhone}</p>
              <p className="text-muted-foreground">{order.customerEmail}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Icon name="MapPin" size={16} />
              Доставка
            </h4>
            <div className="text-sm space-y-1">
              <p>
                {order.deliveryMethod === 'courier' ? 'Курьер' : 'Самовывоз'}
              </p>
              {order.city && <p>{order.city}</p>}
              {order.deliveryAddress && <p className="text-muted-foreground">{order.deliveryAddress}</p>}
              {order.comment && (
                <p className="text-muted-foreground italic">Комментарий: {order.comment}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Icon name="ShoppingBag" size={16} />
            Товары
          </h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm border-b pb-2">
                <div>
                  <p className="font-medium">{item.perfumeName}</p>
                  <p className="text-muted-foreground">{item.perfumeBrand}</p>
                </div>
                <div className="text-right">
                  <p>{item.quantity} шт × {item.price.toLocaleString()} ₽</p>
                  <p className="font-medium">{(item.quantity * item.price).toLocaleString()} ₽</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Товары:</span>
            <span>{(order.totalAmount - order.deliveryPrice).toLocaleString()} ₽</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Доставка:</span>
            <span>{order.deliveryPrice === 0 ? 'Бесплатно' : `${order.deliveryPrice.toLocaleString()} ₽`}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Итого:</span>
            <span>{order.totalAmount.toLocaleString()} ₽</span>
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Оплата: {order.paymentMethod === 'card' ? 'Картой онлайн' : 'Наличными'}
          </div>
        </div>

        <div className="flex gap-2 border-t pt-4">
          <Button onClick={() => onEdit(order)} variant="outline" size="sm">
            <Icon name="Edit" size={16} className="mr-2" />
            Редактировать
          </Button>
          <Button onClick={() => onDelete(order.id)} variant="destructive" size="sm">
            <Icon name="Trash2" size={16} className="mr-2" />
            Удалить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
