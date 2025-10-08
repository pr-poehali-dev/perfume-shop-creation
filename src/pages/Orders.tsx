import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  perfumeId: number;
  perfumeName: string;
  perfumeBrand: string;
  quantity: number;
  price: number;
}

interface Order {
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

const Orders = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/fe8d5d8d-ffbc-4b6e-947f-0842449d171d', {
        headers: {
          'X-Admin-Password': password
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
        setIsAuthenticated(true);
        localStorage.setItem('ordersAdminPassword', password);
      } else {
        toast({
          title: 'Ошибка',
          description: 'Неверный пароль',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadOrders = async (savedPassword: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/fe8d5d8d-ffbc-4b6e-947f-0842449d171d', {
        headers: {
          'X-Admin-Password': savedPassword
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  useEffect(() => {
    const savedPassword = localStorage.getItem('ordersAdminPassword');
    if (savedPassword) {
      setPassword(savedPassword);
      setIsAuthenticated(true);
      loadOrders(savedPassword);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setOrders([]);
    localStorage.removeItem('ordersAdminPassword');
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Ожидает', variant: 'secondary' },
      processing: { label: 'В обработке', variant: 'default' },
      completed: { label: 'Выполнен', variant: 'outline' },
      cancelled: { label: 'Отменён', variant: 'destructive' }
    };

    const statusInfo = statusMap[status] || { label: status, variant: 'default' as const };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Управление заказами</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full"
              disabled={!password || loading}
            >
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Управление заказами</h1>
          <div className="flex items-center gap-4">
            <Button onClick={() => loadOrders(password)} variant="outline" size="sm">
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Заказ {order.orderNumber}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
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
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;
