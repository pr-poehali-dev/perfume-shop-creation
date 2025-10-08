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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новый': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'В обработке': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Доставляется': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Завершён': return 'bg-green-100 text-green-700 border-green-200';
      case 'Отменён': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl">Заказ #{order.orderNumber}</CardTitle>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              {formatDate(order.createdAt)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={order.status} onValueChange={(value) => onStatusChange(order.id, value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Новый">Новый</SelectItem>
                <SelectItem value="В обработке">В обработке</SelectItem>
                <SelectItem value="Доставляется">Доставляется</SelectItem>
                <SelectItem value="Завершён">Завершён</SelectItem>
                <SelectItem value="Отменён">Отменён</SelectItem>
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

        <div className="flex flex-wrap gap-2 border-t pt-4">
          <Button onClick={() => onEdit(order)} variant="outline" size="sm" className="flex-1 md:flex-none">
            <Icon name="Edit" size={16} className="mr-2" />
            Редактировать
          </Button>
          <Button 
            onClick={() => {
              const phone = order.customerPhone.replace(/\D/g, '');
              window.open(`https://wa.me/${phone}`, '_blank');
            }} 
            variant="outline" 
            size="sm"
            className="flex-1 md:flex-none"
          >
            <Icon name="MessageCircle" size={16} className="mr-2" />
            WhatsApp
          </Button>
          <Button 
            onClick={() => window.location.href = `tel:${order.customerPhone}`}
            variant="outline" 
            size="sm"
            className="flex-1 md:flex-none"
          >
            <Icon name="Phone" size={16} className="mr-2" />
            Позвонить
          </Button>
          <Button onClick={() => onDelete(order.id)} variant="destructive" size="sm" className="flex-1 md:flex-none">
            <Icon name="Trash2" size={16} className="mr-2" />
            Удалить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;