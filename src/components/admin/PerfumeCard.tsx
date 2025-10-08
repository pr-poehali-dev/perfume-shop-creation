import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Perfume } from '@/types/perfume';

interface PerfumeCardProps {
  perfume: Perfume;
  onEdit: (perfume: Perfume) => void;
  onDelete: (id: number) => void;
}

export const PerfumeCard = ({ perfume, onEdit, onDelete }: PerfumeCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{perfume.name}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(perfume)}>
              <Icon name="Pencil" size={16} className="mr-1" />
              Изменить
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(perfume.id)}>
              <Icon name="Trash2" size={16} className="mr-1" />
              Удалить
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Бренд</p>
            <p className="font-semibold">{perfume.brand}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Цена</p>
            <p className="font-semibold">{perfume.price.toLocaleString()} ₽</p>
          </div>
          <div>
            <p className="text-muted-foreground">Категория</p>
            <p className="font-semibold">{perfume.category}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Объём</p>
            <p className="font-semibold">{perfume.volume}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Наличие</p>
            <p className="font-semibold">{perfume.availability ? '✅ В наличии' : '❌ Нет'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};