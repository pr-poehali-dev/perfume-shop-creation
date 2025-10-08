import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface OrdersHeaderProps {
  onRefresh: () => void;
  onLogout: () => void;
}

const OrdersHeader = ({ onRefresh, onLogout }: OrdersHeaderProps) => {
  return (
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Управление заказами</h1>
        <div className="flex items-center gap-4">
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
    </header>
  );
};

export default OrdersHeader;
