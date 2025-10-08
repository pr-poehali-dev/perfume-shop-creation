import { useState, useEffect, useRef, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Perfume } from '@/types/perfume';
import * as XLSX from 'xlsx';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { PerfumeCard } from '@/components/admin/PerfumeCard';

const API_URL = 'https://functions.poehali.dev/d898a0d3-06c5-4b2d-a26c-c3b447db586c';
const ADMIN_API_URL = 'https://functions.poehali.dev/9ac7bf2c-5f68-4762-89d0-f4b5392107f3';
const AUTH_API_URL = 'https://functions.poehali.dev/681cc67d-089a-4c22-b1f0-80b99aec3e56';

const Admin = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState<Perfume | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('Все');
  const [filterAvailability, setFilterAvailability] = useState<string>('Все');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

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
    if (isAuthenticated) {
      fetchPerfumes();
    }
  }, [isAuthenticated]);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);

      const perfumesData = jsonData.map((row: any) => ({
        name: row['Название'] || row['name'] || '',
        brand: row['Бренд'] || row['brand'] || '',
        price: Number(row['Цена'] || row['price'] || 0),
        category: row['Категория'] || row['category'] || 'Унисекс',
        volume: row['Объём'] || row['volume'] || '50 мл',
        notes: typeof row['Ноты'] === 'string' ? row['Ноты'].split(',').map((n: string) => n.trim()) : (row['notes'] || []),
        image: row['Изображение'] || row['image'] || '/placeholder.svg',
        concentration: row['Концентрация'] || row['concentration'] || 'Eau de Parfum',
        availability: row['Наличие'] === 'Да' || row['availability'] === true || row['availability'] === 'true'
      }));

      for (const perfume of perfumesData) {
        await fetch(ADMIN_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(perfume)
        });
      }

      toast({
        title: 'Успех',
        description: `Добавлено ${perfumesData.length} товаров`
      });

      fetchPerfumes();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить файл. Проверьте формат Excel',
        variant: 'destructive'
      });
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleLogin = async (password: string) => {
    try {
      const response = await fetch(AUTH_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
        toast({
          title: 'Успешный вход',
          description: 'Добро пожаловать в админ-панель'
        });
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
        description: 'Не удалось подключиться',
        variant: 'destructive'
      });
    }
  };

  const filteredPerfumes = useMemo(() => {
    return perfumes
      .filter(p => {
        const matchSearch = !searchQuery || 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = filterCategory === 'Все' || p.category === filterCategory;
        const matchAvailability = filterAvailability === 'Все' || 
          (filterAvailability === 'В наличии' && p.availability) ||
          (filterAvailability === 'Нет в наличии' && !p.availability);
        return matchSearch && matchCategory && matchAvailability;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return (b.id || 0) - (a.id || 0);
        if (sortBy === 'date-asc') return (a.id || 0) - (b.id || 0);
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [perfumes, searchQuery, filterCategory, filterAvailability, sortBy]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    toast({
      title: 'Выход',
      description: 'Вы вышли из админ-панели'
    });
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) resetForm();
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

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
        <AdminHeader
          onLogout={handleLogout}
          onFileUpload={handleFileUpload}
          fileInputRef={fileInputRef}
          isImporting={isImporting}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={handleDialogChange}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={!!editingPerfume}
        />

        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Поиск по названию или бренду..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="Все">Все категории</option>
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
            <option value="Унисекс">Унисекс</option>
          </select>
          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="Все">Все товары</option>
            <option value="В наличии">В наличии</option>
            <option value="Нет в наличии">Нет в наличии</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="date-desc">Новые первые</option>
            <option value="date-asc">Старые первые</option>
            <option value="name-asc">По названию (А-Я)</option>
            <option value="price-asc">Цена (возр.)</option>
            <option value="price-desc">Цена (убыв.)</option>
          </select>
        </div>

        <div className="mb-4 text-muted-foreground">
          Найдено товаров: <span className="font-semibold text-foreground">{filteredPerfumes.length}</span> из {perfumes.length}
        </div>

        <div className="grid gap-4">
          {filteredPerfumes.map((perfume) => (
            <PerfumeCard
              key={perfume.id}
              perfume={perfume}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filteredPerfumes.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">Товары не найдены</p>
            <p className="text-sm mt-2">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;