import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface OrdersHeaderProps {
  onRefresh: () => void;
  onLogout: () => void;
}

const OrdersHeader = ({ onRefresh, onLogout }: OrdersHeaderProps) => {
  return (
    <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Управление заказами</h1>
            <p className="text-sm text-muted-foreground mt-1">Отслеживание и обработка заказов клиентов</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={onRefresh} variant="outline" size="sm">
              <Icon name="RefreshCw" size={16} className="mr-2" />
              Обновить
            </Button>
            <Button onClick={onLogout} variant="outline" size="sm">
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OrdersHeader;