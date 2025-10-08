import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { PerfumeForm } from './PerfumeForm';

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

interface AdminHeaderProps {
  onLogout: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isImporting: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

export const AdminHeader = ({
  onLogout,
  onFileUpload,
  fileInputRef,
  isImporting,
  isDialogOpen,
  setIsDialogOpen,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEditing
}: AdminHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">Админ-панель</h1>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onLogout}>
          <Icon name="LogOut" size={18} className="mr-2" />
          Выйти
        </Button>
        <Button 
          variant="outline" 
          onClick={() => fileInputRef.current?.click()}
          disabled={isImporting}
        >
          <Icon name="FileUp" size={18} className="mr-2" />
          {isImporting ? 'Загрузка...' : 'Импорт Excel'}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={onFileUpload}
          className="hidden"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Icon name="Plus" size={20} className="mr-2" />
              Добавить товар
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Редактировать товар' : 'Новый товар'}</DialogTitle>
            </DialogHeader>
            <PerfumeForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              onCancel={onCancel}
              isEditing={isEditing}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
