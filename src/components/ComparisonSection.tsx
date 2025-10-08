import { useState, useEffect } from 'react';
import { Perfume } from '@/types/perfume';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface ComparisonSectionProps {
  perfumes: Perfume[];
  comparison: number[];
  toggleComparison: (id: number) => void;
  addToCart: (id: number) => void;
}

const ComparisonSection = ({ perfumes, comparison, toggleComparison, addToCart }: ComparisonSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(comparison.length > 0);
  }, [comparison]);

  const comparisonItems = comparison.map(id => perfumes.find(p => p.id === id)).filter(Boolean) as Perfume[];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 max-w-sm">
      <Card className="shadow-2xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="GitCompare" size={20} />
              Сравнение ({comparison.length})
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 max-h-96 overflow-y-auto">
          {comparisonItems.map(perfume => (
            <div key={perfume.id} className="flex items-center gap-3 p-2 border rounded-lg bg-card">
              <img 
                src={perfume.image} 
                alt={perfume.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{perfume.name}</p>
                <p className="text-xs text-muted-foreground">{perfume.brand}</p>
                <p className="text-sm font-semibold text-primary">{perfume.price.toLocaleString()} ₽</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleComparison(perfume.id)}
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          ))}
          
          {comparisonItems.length >= 2 && (
            <div className="border-t pt-3 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground mb-1">Цена</p>
                  <p className="font-semibold">
                    {Math.min(...comparisonItems.map(p => p.price)).toLocaleString()} ₽ - {Math.max(...comparisonItems.map(p => p.price)).toLocaleString()} ₽
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Разница</p>
                  <p className="font-semibold text-orange-600">
                    {(Math.max(...comparisonItems.map(p => p.price)) - Math.min(...comparisonItems.map(p => p.price))).toLocaleString()} ₽
                  </p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Общие ноты:</p>
                <div className="flex flex-wrap gap-1">
                  {Array.from(new Set(
                    comparisonItems.flatMap(p => p.notes)
                  )).filter(note => 
                    comparisonItems.every(p => p.notes.includes(note))
                  ).map(note => (
                    <Badge key={note} variant="secondary" className="text-xs">
                      {note}
                    </Badge>
                  ))}
                  {Array.from(new Set(
                    comparisonItems.flatMap(p => p.notes)
                  )).filter(note => 
                    comparisonItems.every(p => p.notes.includes(note))
                  ).length === 0 && (
                    <span className="text-xs text-muted-foreground">Нет общих нот</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonSection;
