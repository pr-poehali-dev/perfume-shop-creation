import { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import OrderLoginForm from '@/components/orders/OrderLoginForm';
import OrdersHeader from '@/components/orders/OrdersHeader';
import OrdersStatistics from '@/components/orders/OrdersStatistics';
import OrdersList from '@/components/orders/OrdersList';
import OrderEditDialog from '@/components/orders/OrderEditDialog';
import { Order } from '@/components/orders/OrdersTypes';

const API_URL = 'https://functions.poehali.dev/fe8d5d8d-ffbc-4b6e-947f-0842449d171d';

const Orders = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Все');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const { toast } = useToast();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
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
      const response = await fetch(API_URL, {
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

  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => {
        const matchSearch = !searchQuery ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerPhone.includes(searchQuery) ||
          (order.customerEmail && order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchStatus = filterStatus === 'Все' || order.status === filterStatus;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'date-asc') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        if (sortBy === 'total-desc') return b.totalAmount - a.totalAmount;
        if (sortBy === 'total-asc') return a.totalAmount - b.totalAmount;
        return 0;
      });
  }, [orders, searchQuery, filterStatus, sortBy]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setOrders([]);
    localStorage.removeItem('ordersAdminPassword');
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': password
        },
        body: JSON.stringify({ orderId, status: newStatus })
      });

      if (response.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        toast({
          title: 'Статус обновлён',
          description: 'Статус заказа успешно изменён'
        });
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить статус',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот заказ?')) return;

    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': password
        },
        body: JSON.stringify({ orderId })
      });

      if (response.ok) {
        setOrders(orders.filter(o => o.id !== orderId));
        toast({
          title: 'Заказ удалён',
          description: 'Заказ успешно удалён из базы данных'
        });
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось удалить заказ',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive'
      });
    }
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingOrder) return;

    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': password
        },
        body: JSON.stringify({
          orderId: editingOrder.id,
          customerName: editingOrder.customerName,
          customerPhone: editingOrder.customerPhone,
          customerEmail: editingOrder.customerEmail,
          deliveryAddress: editingOrder.deliveryAddress,
          city: editingOrder.city,
          comment: editingOrder.comment
        })
      });

      if (response.ok) {
        setOrders(orders.map(o => o.id === editingOrder.id ? editingOrder : o));
        setIsEditDialogOpen(false);
        toast({
          title: 'Заказ обновлён',
          description: 'Данные заказа успешно изменены'
        });
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось обновить заказ',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive'
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <OrderLoginForm
        password={password}
        loading={loading}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <OrdersHeader
        onRefresh={() => loadOrders(password)}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        <OrdersStatistics orders={orders} />
        
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Поиск по имени, телефону, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="Все">Все статусы</option>
            <option value="Новый">Новый</option>
            <option value="В обработке">В обработке</option>
            <option value="Доставляется">Доставляется</option>
            <option value="Завершён">Завершён</option>
            <option value="Отменён">Отменён</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="date-desc">Новые первые</option>
            <option value="date-asc">Старые первые</option>
            <option value="total-desc">Сумма (убыв.)</option>
            <option value="total-asc">Сумма (возр.)</option>
          </select>
        </div>

        <div className="mb-4 text-muted-foreground">
          Найдено заказов: <span className="font-semibold text-foreground">{filteredOrders.length}</span> из {orders.length}
        </div>
        
        <OrdersList
          orders={filteredOrders}
          onStatusChange={handleStatusChange}
          onEdit={handleEditOrder}
          onDelete={handleDeleteOrder}
        />
      </main>

      <OrderEditDialog
        open={isEditDialogOpen}
        editingOrder={editingOrder}
        onOpenChange={setIsEditDialogOpen}
        onOrderChange={setEditingOrder}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Orders;