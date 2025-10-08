import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Поиск по названию или бренду..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-10"
      />
      {query && (
        <button
          onClick={() => handleChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <Icon name="X" size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
