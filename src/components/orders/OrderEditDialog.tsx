import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Order } from './OrdersTypes';

interface OrderEditDialogProps {
  open: boolean;
  editingOrder: Order | null;
  onOpenChange: (open: boolean) => void;
  onOrderChange: (order: Order) => void;
  onSave: () => void;
}

const OrderEditDialog = ({ open, editingOrder, onOpenChange, onOrderChange, onSave }: OrderEditDialogProps) => {
  if (!editingOrder) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Редактировать заказ {editingOrder.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Имя клиента</Label>
            <Input
              id="edit-name"
              value={editingOrder.customerName}
              onChange={(e) => onOrderChange({ ...editingOrder, customerName: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="edit-phone">Телефон</Label>
            <Input
              id="edit-phone"
              value={editingOrder.customerPhone}
              onChange={(e) => onOrderChange({ ...editingOrder, customerPhone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              value={editingOrder.customerEmail}
              onChange={(e) => onOrderChange({ ...editingOrder, customerEmail: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="edit-city">Город</Label>
            <Input
              id="edit-city"
              value={editingOrder.city}
              onChange={(e) => onOrderChange({ ...editingOrder, city: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="edit-address">Адрес доставки</Label>
            <Input
              id="edit-address"
              value={editingOrder.deliveryAddress}
              onChange={(e) => onOrderChange({ ...editingOrder, deliveryAddress: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="edit-comment">Комментарий</Label>
            <Textarea
              id="edit-comment"
              value={editingOrder.comment}
              onChange={(e) => onOrderChange({ ...editingOrder, comment: e.target.value })}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={onSave}>
            Сохранить изменения
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderEditDialog;
