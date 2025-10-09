import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PromoTimerProps {
  endDate: string;
  title: string;
  discount: number;
}

const PromoTimer = ({ endDate, title, discount }: PromoTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isExpired) return null;

  return (
    <Card className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Icon name="Zap" size={24} className="text-yellow-300" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-white/90 text-sm">Успейте купить по выгодной цене!</p>
          </div>
        </div>

        <Badge className="bg-yellow-400 text-black text-xl px-4 py-2 font-bold hover:bg-yellow-300">
          -{discount}%
        </Badge>
      </div>

      <div className="flex gap-4 mt-6 justify-center">
        <div className="text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <div className="text-3xl font-bold">{timeLeft.days}</div>
            <div className="text-xs text-white/80 mt-1">дней</div>
          </div>
        </div>
        <div className="text-3xl font-bold self-center">:</div>
        <div className="text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <div className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs text-white/80 mt-1">часов</div>
          </div>
        </div>
        <div className="text-3xl font-bold self-center">:</div>
        <div className="text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <div className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs text-white/80 mt-1">минут</div>
          </div>
        </div>
        <div className="text-3xl font-bold self-center">:</div>
        <div className="text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[70px]">
            <div className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs text-white/80 mt-1">секунд</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PromoTimer;
