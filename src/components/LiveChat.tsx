import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
}

interface LiveChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveChat = ({ isOpen, onClose }: LiveChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'support',
      text: 'Здравствуйте! Чем могу помочь?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'Статус заказа',
    'Условия доставки',
    'Способы оплаты',
    'Помощь в выборе',
    'Акции и скидки',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        'статус заказа': 'Для проверки статуса заказа перейдите в личный кабинет или укажите номер заказа.',
        'условия доставки': 'Доставка по Москве — бесплатно от 3000₽. По России — от 300₽, срок 3-7 дней.',
        'способы оплаты': 'Принимаем: банковские карты, электронные кошельки, оплата при получении.',
        'помощь в выборе': 'С удовольствием помогу подобрать аромат! Расскажите о ваших предпочтениях.',
        'акции и скидки': 'Сейчас действуют промокоды: WELCOME10 (-10%), SALE20 (-20%), VIP30 (-30%).',
      };

      const lowerText = text.toLowerCase();
      let responseText = 'Спасибо за ваш вопрос! Специалист свяжется с вами в ближайшее время.';

      for (const [key, value] of Object.entries(responses)) {
        if (lowerText.includes(key)) {
          responseText = value;
          break;
        }
      }

      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        text: responseText,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b bg-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Icon name="Headphones" size={20} />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary"></div>
              </div>
              <div>
                <DialogTitle className="text-primary-foreground">Поддержка</DialogTitle>
                <p className="text-xs text-primary-foreground/80">Обычно отвечаем за минуту</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <Button
                key={reply}
                variant="outline"
                size="sm"
                onClick={() => sendMessage(reply)}
                className="text-xs"
              >
                {reply}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Введите сообщение..."
              className="flex-1"
            />
            <Button onClick={() => sendMessage(input)} size="icon">
              <Icon name="Send" size={18} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveChat;
