import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import ProductsManagement from './admin/ProductsManagement';
import OrdersManagement from './admin/OrdersManagement';
import { Perfume } from '@/types/perfume';
import { Order } from '@/types/order';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  perfumes: Perfume[];
  setPerfumes: (perfumes: Perfume[] | ((prev: Perfume[]) => Perfume[])) => void;
  orders: Order[];
  setOrders: (orders: Order[] | ((prev: Order[]) => Order[])) => void;
}

const AdminPanel = ({ isOpen, onClose, perfumes, setPerfumes, orders, setOrders }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState('products');

  const stats = {
    totalProducts: perfumes.length,
    availableProducts: perfumes.filter(p => p.availability).length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Icon name="Settings" size={24} />
            Панель управления
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Товары</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
              <p className="text-xs text-muted-foreground">В наличии: {stats.availableProducts}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Заказы</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
              <p className="text-xs text-muted-foreground">Новые: {stats.pendingOrders}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Выручка</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.revenue.toLocaleString()} ₽</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Средний чек</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {stats.totalOrders > 0 
                  ? Math.round(stats.revenue / stats.totalOrders).toLocaleString() 
                  : 0} ₽
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">
              <Icon name="Package" size={16} className="mr-2" />
              Товары
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Icon name="ShoppingBag" size={16} className="mr-2" />
              Заказы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-4">
            <ProductsManagement 
              perfumes={perfumes}
              setPerfumes={setPerfumes}
            />
          </TabsContent>

          <TabsContent value="orders" className="mt-4">
            <OrdersManagement 
              orders={orders}
              setOrders={setOrders}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
