import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Order } from '@/types/order';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

const statusColors = {
  pending: 'bg-yellow-500',
  processing: 'bg-blue-500',
  shipped: 'bg-purple-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500',
};

const statusLabels = {
  pending: 'Новый',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

const UserProfile = ({ isOpen, onClose, orders }: UserProfileProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [userData, setUserData] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    phone: localStorage.getItem('userPhone') || '',
    address: localStorage.getItem('userAddress') || '',
  });

  const handleSaveProfile = () => {
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userPhone', userData.phone);
    localStorage.setItem('userAddress', userData.address);
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const orderCount = orders.length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;

  return (
    <>
      <Dialog open={isOpen && !selectedOrder} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Icon name="User" size={24} />
              Личный кабинет
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Заказов</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{orders.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Выполнено</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{completedOrders}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Потрачено</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalSpent.toLocaleString()} ₽</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="orders">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders">
                <Icon name="ShoppingBag" size={16} className="mr-2" />
                Мои заказы
              </TabsTrigger>
              <TabsTrigger value="profile">
                <Icon name="Settings" size={16} className="mr-2" />
                Профиль
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="mt-4 space-y-3">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="ShoppingBag" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">У вас пока нет заказов</p>
                </div>
              ) : (
                orders.map(order => (
                  <Card key={order.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedOrder(order)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold">Заказ #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <Badge className={statusColors[order.status]}>
                          {statusLabels[order.status]}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} товар(ов)
                        </p>
                        <p className="text-lg font-bold">{order.total.toLocaleString()} ₽</p>
                      </div>
                      <div className="flex gap-2 mt-3 overflow-x-auto">
                        {order.items.slice(0, 4).map(item => (
                          <img 
                            key={item.id}
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ))}
                        {order.items.length > 4 && (
                          <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs">
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="profile" className="mt-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label>Имя</Label>
                    <Input
                      value={userData.name}
                      onChange={(e) => setUserData({...userData, name: e.target.value})}
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label>Телефон</Label>
                    <Input
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      placeholder="+7 (999) 999-99-99"
                    />
                  </div>
                  <div>
                    <Label>Адрес доставки</Label>
                    <Input
                      value={userData.address}
                      onChange={(e) => setUserData({...userData, address: e.target.value})}
                      placeholder="Адрес доставки"
                    />
                  </div>
                  <Button onClick={handleSaveProfile} className="w-full">
                    <Icon name="Save" size={16} className="mr-2" />
                    Сохранить
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Заказ #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Дата заказа</p>
                  <p className="font-semibold">{new Date(selectedOrder.date).toLocaleString('ru-RU')}</p>
                </div>
                <Badge className={statusColors[selectedOrder.status]}>
                  {statusLabels[selectedOrder.status]}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Товары</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 border rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <p className="text-sm">
                          {item.price.toLocaleString()} ₽ × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} ₽</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span>{selectedOrder.total.toLocaleString()} ₽</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Доставка</h3>
                <p className="text-sm text-muted-foreground">{selectedOrder.customer.address}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserProfile;