import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface IndexFloatingButtonsProps {
  setIsChatOpen: (open: boolean) => void;
  setIsProfileOpen: (open: boolean) => void;
  openAdminPanel: () => void;
  setIsAdminOpen: (open: boolean) => void;
}

const IndexFloatingButtons = ({
  setIsChatOpen,
  setIsProfileOpen,
  openAdminPanel,
  setIsAdminOpen,
}: IndexFloatingButtonsProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <Button
        onClick={() => setIsChatOpen(true)}
        className="h-14 w-14 rounded-full shadow-2xl bg-green-500 hover:bg-green-600"
        title="Онлайн-чат"
      >
        <Icon name="MessageCircle" size={20} />
      </Button>

      <Button
        onClick={() => setIsProfileOpen(true)}
        className="h-14 w-14 rounded-full shadow-2xl"
        title="Личный кабинет"
      >
        <Icon name="User" size={20} />
      </Button>

      <Button
        onClick={openAdminPanel}
        variant="outline"
        className="h-12 w-12 rounded-full shadow-xl hidden"
        title="Админ-панель"
        onDoubleClick={() => setIsAdminOpen(true)}
      >
        <Icon name="Settings" size={18} />
      </Button>
    </div>
  );
};

export default IndexFloatingButtons;