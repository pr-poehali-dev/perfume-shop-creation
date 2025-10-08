export interface Perfume {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  volume: string;
  notes: string[];
  image: string;
  concentration?: string;
  availability?: boolean;
}

export const perfumes: Perfume[] = [
  {
    id: 1,
    name: 'Noir Élégance',
    brand: 'Maison Royale',
    price: 12500,
    category: 'Унисекс',
    volume: '100 мл',
    notes: ['Бергамот', 'Роза', 'Пачули'],
    image: '/placeholder.svg',
    concentration: 'Eau de Parfum',
    availability: true
  },
  {
    id: 2,
    name: 'Velvet Dreams',
    brand: 'Parfumerie de Luxe',
    price: 15800,
    category: 'Женский',
    volume: '50 мл',
    notes: ['Ваниль', 'Жасмин', 'Амбра'],
    image: '/placeholder.svg',
    concentration: 'Extrait de Parfum',
    availability: true
  },
  {
    id: 3,
    name: 'Royal Oak',
    brand: 'Heritage House',
    price: 18900,
    category: 'Мужской',
    volume: '100 мл',
    notes: ['Дуб', 'Кедр', 'Ветивер'],
    image: '/placeholder.svg',
    concentration: 'Eau de Toilette',
    availability: false
  },
  {
    id: 4,
    name: 'Golden Sunset',
    brand: 'Soleil d\'Or',
    price: 9800,
    category: 'Женский',
    volume: '75 мл',
    notes: ['Цитрус', 'Пион', 'Сандал'],
    image: '/placeholder.svg',
    concentration: 'Eau de Toilette',
    availability: true
  },
  {
    id: 5,
    name: 'Midnight Mystery',
    brand: 'Maison Royale',
    price: 14200,
    category: 'Унисекс',
    volume: '100 мл',
    notes: ['Удовая древесина', 'Кожа', 'Мускус'],
    image: '/placeholder.svg',
    concentration: 'Eau de Parfum',
    availability: true
  },
  {
    id: 6,
    name: 'Crystal Rose',
    brand: 'Parfumerie de Luxe',
    price: 11500,
    category: 'Женский',
    volume: '50 мл',
    notes: ['Роза', 'Личи', 'Белый чай'],
    image: '/placeholder.svg',
    concentration: 'Eau de Parfum',
    availability: true
  }
];