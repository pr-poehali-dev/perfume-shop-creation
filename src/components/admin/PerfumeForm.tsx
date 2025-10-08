import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface FormData {
  name: string;
  brand: string;
  price: number;
  category: string;
  volume: string;
  notes: string;
  image: string;
  concentration: string;
  availability: boolean;
}

interface PerfumeFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

export const PerfumeForm = ({ formData, setFormData, onSubmit, onCancel, isEditing }: PerfumeFormProps) => {
  const quickFillVolumes = ['30 мл', '50 мл', '75 мл', '100 мл'];
  const quickFillConcentrations = ['Eau de Parfum', 'Eau de Toilette', 'Parfum', 'Cologne'];
  
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>

      <div>
        <Label htmlFor="brand">Бренд</Label>
        <Input
          id="brand"
          value={formData.brand}
          onChange={(e) => setFormData({...formData, brand: e.target.value})}
          required
        />
      </div>

      <div>
        <Label htmlFor="price">Цена (₽)</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="100"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Категория</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Мужской">Мужской</SelectItem>
            <SelectItem value="Женский">Женский</SelectItem>
            <SelectItem value="Унисекс">Унисекс</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="volume">Объём</Label>
        <Input
          id="volume"
          value={formData.volume}
          onChange={(e) => setFormData({...formData, volume: e.target.value})}
          placeholder="50 мл"
          required
        />
        <div className="flex gap-2 mt-2">
          {quickFillVolumes.map(vol => (
            <button
              key={vol}
              type="button"
              onClick={() => setFormData({...formData, volume: vol})}
              className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded"
            >
              {vol}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="concentration">Концентрация</Label>
        <Input
          id="concentration"
          value={formData.concentration}
          onChange={(e) => setFormData({...formData, concentration: e.target.value})}
          placeholder="Eau de Parfum"
        />
        <div className="flex gap-2 mt-2 flex-wrap">
          {quickFillConcentrations.map(conc => (
            <button
              key={conc}
              type="button"
              onClick={() => setFormData({...formData, concentration: conc})}
              className="px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded"
            >
              {conc}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="availability"
          checked={formData.availability}
          onCheckedChange={(checked) => setFormData({...formData, availability: checked as boolean})}
        />
        <Label htmlFor="availability">В наличии</Label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {isEditing ? 'Обновить' : 'Создать'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
};