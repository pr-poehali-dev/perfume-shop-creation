CREATE TABLE perfumes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL,
  volume VARCHAR(50) NOT NULL,
  notes TEXT[] NOT NULL,
  image VARCHAR(500),
  concentration VARCHAR(100),
  availability BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_perfumes_category ON perfumes(category);
CREATE INDEX idx_perfumes_brand ON perfumes(brand);
CREATE INDEX idx_perfumes_price ON perfumes(price);

INSERT INTO perfumes (name, brand, price, category, volume, notes, image, concentration, availability) VALUES
('Noir Élégance', 'Maison Royale', 12500, 'Унисекс', '100 мл', ARRAY['Бергамот', 'Роза', 'Пачули'], '/placeholder.svg', 'Eau de Parfum', true),
('Velvet Dreams', 'Parfumerie de Luxe', 15800, 'Женский', '50 мл', ARRAY['Ваниль', 'Жасмин', 'Амбра'], '/placeholder.svg', 'Extrait de Parfum', true),
('Royal Oak', 'Heritage House', 18900, 'Мужской', '100 мл', ARRAY['Дуб', 'Кедр', 'Ветивер'], '/placeholder.svg', 'Eau de Toilette', false),
('Golden Sunset', 'Soleil d''Or', 9800, 'Женский', '75 мл', ARRAY['Цитрус', 'Пион', 'Сандал'], '/placeholder.svg', 'Eau de Toilette', true),
('Midnight Mystery', 'Maison Royale', 14200, 'Унисекс', '100 мл', ARRAY['Удовая древесина', 'Кожа', 'Мускус'], '/placeholder.svg', 'Eau de Parfum', true),
('Crystal Rose', 'Parfumerie de Luxe', 11500, 'Женский', '50 мл', ARRAY['Роза', 'Личи', 'Белый чай'], '/placeholder.svg', 'Eau de Parfum', true);