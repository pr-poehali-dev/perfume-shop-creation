import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface WishlistButtonProps {
  perfumeId: number;
  onToggle?: (id: number, isInWishlist: boolean) => void;
}

const WishlistButton = ({ perfumeId, onToggle }: WishlistButtonProps) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.includes(perfumeId));
  }, [perfumeId]);

  const handleToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newWishlist;

    if (isInWishlist) {
      newWishlist = wishlist.filter((id: number) => id !== perfumeId);
    } else {
      newWishlist = [...wishlist, perfumeId];
    }

    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsInWishlist(!isInWishlist);
    
    window.dispatchEvent(new Event('wishlist-updated'));
    
    if (onToggle) {
      onToggle(perfumeId, !isInWishlist);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={`transition-colors ${isInWishlist ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'}`}
    >
      <Icon name={isInWishlist ? 'Heart' : 'Heart'} size={18} className={isInWishlist ? 'fill-current' : ''} />
    </Button>
  );
};

export default WishlistButton;