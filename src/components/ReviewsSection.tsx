import { useState } from 'react';
import { Review } from '@/types/perfume';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ReviewsSectionProps {
  perfumeId: number;
  reviews: Review[];
  onAddReview: (perfumeId: number, review: Omit<Review, 'id' | 'helpful'>) => void;
}

const ReviewsSection = ({ perfumeId, reviews, onAddReview }: ReviewsSectionProps) => {
  const [isWriting, setIsWriting] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('5');
  const [text, setText] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadingImages(true);
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [...prev, event.target!.result as string]);
        }
        setUploadingImages(false);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!author.trim() || !text.trim()) return;

    onAddReview(perfumeId, {
      author: author.trim(),
      rating: parseInt(rating),
      date: new Date().toISOString(),
      text: text.trim(),
      images: images.length > 0 ? images : undefined,
      verified: true,
    });

    setAuthor('');
    setRating('5');
    setText('');
    setImages([]);
    setIsWriting(false);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'rating-high') return b.rating - a.rating;
    if (sortBy === 'rating-low') return a.rating - b.rating;
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    return 0;
  });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100 
      : 0
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">{averageRating}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={16}
                        className={
                          star <= Math.round(parseFloat(averageRating))
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {reviews.length} {reviews.length === 1 ? 'отзыв' : 'отзывов'}
                  </p>
                </div>

                <div className="flex-1 space-y-2">
                  {ratingDistribution.map(({ stars, count, percentage }) => (
                    <div key={stars} className="flex items-center gap-2 text-sm">
                      <span className="w-3">{stars}</span>
                      <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-muted-foreground">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setIsWriting(!isWriting)} size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Написать отзыв
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Сначала новые</SelectItem>
                    <SelectItem value="rating-high">Высокий рейтинг</SelectItem>
                    <SelectItem value="rating-low">Низкий рейтинг</SelectItem>
                    <SelectItem value="helpful">По полезности</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>

        {isWriting && (
          <CardContent className="border-t">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Ваше имя"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ Отлично</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ Хорошо</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ Нормально</SelectItem>
                    <SelectItem value="2">⭐⭐ Плохо</SelectItem>
                    <SelectItem value="1">⭐ Ужасно</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Поделитесь своими впечатлениями о парфюме..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
              />

              <div>
                <label htmlFor="review-images" className="cursor-pointer">
                  <div className="border-2 border-dashed border-muted rounded-lg p-4 hover:border-primary transition-colors flex items-center justify-center gap-2">
                    <Icon name="Image" size={20} />
                    <span className="text-sm text-muted-foreground">
                      {uploadingImages ? 'Загрузка...' : 'Добавить фото (+100 бонусов)'}
                    </span>
                  </div>
                </label>
                <input
                  id="review-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {images.map((img, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border">
                      <img src={img} alt={`Превью ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={handleSubmit} disabled={!author.trim() || !text.trim()}>
                  Отправить отзыв
                </Button>
                <Button variant="outline" onClick={() => setIsWriting(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{review.author}</span>
                    {review.verified && (
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                        <Icon name="BadgeCheck" size={12} />
                        <span>Покупатель</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          size={14}
                          className={
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-3">{review.text}</p>

              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-3 flex-wrap">
                  {review.images.map((img, index) => (
                    <div key={index} className="w-24 h-24 rounded-lg overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity">
                      <img src={img} alt={`Фото ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-xs">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Icon name="ThumbsUp" size={14} />
                  Полезно ({review.helpful})
                </button>
              </div>
            </CardContent>
          </Card>
        ))}

        {reviews.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Пока нет отзывов. Будьте первым!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;