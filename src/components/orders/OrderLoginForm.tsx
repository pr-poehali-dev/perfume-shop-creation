import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface OrderLoginFormProps {
  password: string;
  loading: boolean;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
}

const OrderLoginForm = ({ password, loading, onPasswordChange, onLogin }: OrderLoginFormProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Управление заказами</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onLogin()}
            />
          </div>
          <Button 
            onClick={onLogin} 
            className="w-full"
            disabled={!password || loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderLoginForm;
