import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Perfume } from '@/types/perfume';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const API_URL = 'https://functions.poehali.dev/d898a0d3-06c5-4b2d-a26c-c3b447db586c';
const ADMIN_API_URL = 'https://functions.poehali.dev/9ac7bf2c-5f68-4762-89d0-f4b5392107f3';

const Admin = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: 0,
    category: 'Унисекс',
    volume: '50 мл',
    notes: '',
    image: '/placeholder.svg',
    concentration: 'Eau de Parfum',
    availability: true
  });

  const fetchPerfumes = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPerfumes(data);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить товары',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const notesArray = formData.notes.split(',').map(n => n.trim()).filter(n => n);
    
    const perfumeData = {
      ...formData,
      notes: notesArray,
      ...(editingPerfume && { id: editingPerfume.id })
    };

    try {
      const response = await fetch(ADMIN_API_URL, {
        method: editingPerfume ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perfumeData)
      });

      if (response.ok) {
        toast({
          title: 'Успех',
          description: editingPerfume ? 'Товар обновлен' : 'Товар добавлен'
        });
        setIsDialogOpen(false);
        resetForm();
        fetchPerfumes();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить товар',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот товар?')) return;

    try {
      const response = await fetch(`${ADMIN_API_URL}?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({
          title: 'Успех',
          description: 'Товар удален'
        });
        fetchPerfumes();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить товар',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (perfume: Perfume) => {
    setEditingPerfume(perfume);
    setFormData({
      name: perfume.name,
      brand: perfume.brand,
      price: perfume.price,
      category: perfume.category,
      volume: perfume.volume,
      notes: perfume.notes.join(', '),
      image: perfume.image || '/placeholder.svg',
      concentration: perfume.concentration || 'Eau de Parfum',
      availability: perfume.availability !== false
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingPerfume(null);
    setFormData({
      name: '',
      brand: '',
      price: 0,
      category: 'Унисекс',
      volume: '50 мл',
      notes: '',
      image: '/placeholder.svg',
      concentration: 'Eau de Parfum',
      availability: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Админ-панель</h1>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить товар
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPerfume ? 'Редактировать товар' : 'Новый товар'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
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
                </div>

                <div>
                  <Label htmlFor="notes">Ноты (через запятую)</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Бергамот, Роза, Пачули"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="concentration">Концентрация</Label>
                  <Input
                    id="concentration"
                    value={formData.concentration}
                    onChange={(e) => setFormData({...formData, concentration: e.target.value})}
                  />
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
                    {editingPerfume ? 'Обновить' : 'Создать'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {perfumes.map((perfume) => (
            <Card key={perfume.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{perfume.name}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(perfume)}>
                      <Icon name="Pencil" size={16} className="mr-1" />
                      Изменить
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(perfume.id)}>
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
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Ноты</p>
                    <p className="font-semibold">{perfume.notes.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Наличие</p>
                    <p className="font-semibold">{perfume.availability ? '✅ В наличии' : '❌ Нет'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
