import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Perfume } from '@/types/perfume';
import { useToast } from '@/hooks/use-toast';

interface ProductsManagementProps {
  perfumes: Perfume[];
  setPerfumes: (perfumes: Perfume[] | ((prev: Perfume[]) => Perfume[])) => void;
}

const ProductsManagement = ({ perfumes, setPerfumes }: ProductsManagementProps) => {
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Perfume | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = Array.from(new Set(perfumes.map(p => p.category)));

  const filteredProducts = perfumes.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product: Perfume) => {
    setEditingProduct(product);
    setIsEditOpen(true);
  };

  const handleAdd = () => {
    const newProduct: Perfume = {
      id: Math.max(...perfumes.map(p => p.id), 0) + 1,
      name: '',
      brand: '',
      price: 0,
      category: 'Унисекс',
      volume: '50 мл',
      notes: [],
      image: '/placeholder.svg',
      availability: true,
      description: '',
      reviews: [],
      rating: 0,
      reviewsCount: 0,
    };
    setEditingProduct(newProduct);
    setIsEditOpen(true);
  };

  const handleSave = () => {
    if (!editingProduct) return;

    if (!editingProduct.name || !editingProduct.brand || editingProduct.price <= 0) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive'
      });
      return;
    }

    setPerfumes(prev => {
      const exists = prev.find(p => p.id === editingProduct.id);
      if (exists) {
        return prev.map(p => p.id === editingProduct.id ? editingProduct : p);
      }
      return [...prev, editingProduct];
    });

    toast({
      title: 'Успешно',
      description: `Товар ${editingProduct.name} сохранён`,
    });

    setIsEditOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Удалить этот товар?')) {
      setPerfumes(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'Удалено',
        description: 'Товар удалён из каталога',
      });
    }
  };

  const toggleAvailability = (id: number) => {
    setPerfumes(prev => prev.map(p => 
      p.id === id ? { ...p, availability: !p.availability } : p
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Поиск по названию или бренду..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAdd} className="w-full md:w-auto">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить товар
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Изображение</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Бренд</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Наличие</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.price.toLocaleString()} ₽</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={product.availability}
                    onCheckedChange={() => toggleAvailability(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Icon name="Pencil" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct?.name ? 'Редактировать товар' : 'Новый товар'}
            </DialogTitle>
          </DialogHeader>

          {editingProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Название *</Label>
                  <Input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    placeholder="Название парфюма"
                  />
                </div>
                <div>
                  <Label>Бренд *</Label>
                  <Input
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({...editingProduct, brand: e.target.value})}
                    placeholder="Бренд"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Цена *</Label>
                  <Input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label>Скидка %</Label>
                  <Input
                    type="number"
                    value={editingProduct.discount || 0}
                    onChange={(e) => setEditingProduct({...editingProduct, discount: Number(e.target.value)})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label>Объём</Label>
                  <Input
                    value={editingProduct.volume}
                    onChange={(e) => setEditingProduct({...editingProduct, volume: e.target.value})}
                    placeholder="50 мл"
                  />
                </div>
              </div>

              <div>
                <Label>Категория</Label>
                <Select
                  value={editingProduct.category}
                  onValueChange={(value) => setEditingProduct({...editingProduct, category: value})}
                >
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
                <Label>URL изображения</Label>
                <Input
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label>Описание</Label>
                <Textarea
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  placeholder="Описание товара"
                  rows={4}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={editingProduct.availability}
                  onCheckedChange={(checked) => setEditingProduct({...editingProduct, availability: checked})}
                />
                <Label>В наличии</Label>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSave}>
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsManagement;
