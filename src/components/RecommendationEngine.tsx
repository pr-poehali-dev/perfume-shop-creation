import { Perfume } from '@/types/perfume';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface RecommendationEngineProps {
  perfumes: Perfume[];
  currentPerfume?: Perfume;
  cart: { id: number; quantity: number }[];
  wishlist: number[];
  recentlyViewed: number[];
  onAddToCart: (id: number) => void;
  onQuickView: (perfume: Perfume) => void;
}

const RecommendationEngine = ({
  perfumes,
  currentPerfume,
  cart,
  wishlist,
  recentlyViewed,
  onAddToCart,
  onQuickView,
}: RecommendationEngineProps) => {
  const getRecommendations = (): Perfume[] => {
    const recommendations: Perfume[] = [];
    const cartIds = cart.map(item => item.id);
    const allInteractions = [...cartIds, ...wishlist, ...recentlyViewed];

    if (currentPerfume) {
      const similar = perfumes.filter(p => 
        p.id !== currentPerfume.id &&
        !cartIds.includes(p.id) &&
        (p.category === currentPerfume.category || 
         p.brand === currentPerfume.brand ||
         Math.abs(p.price - currentPerfume.price) < 1000)
      ).slice(0, 4);
      recommendations.push(...similar);
    }

    if (allInteractions.length > 0) {
      const interactedPerfumes = perfumes.filter(p => allInteractions.includes(p.id));
      const categories = [...new Set(interactedPerfumes.map(p => p.category))];
      const brands = [...new Set(interactedPerfumes.map(p => p.brand))];

      const personalized = perfumes.filter(p => 
        !cartIds.includes(p.id) &&
        !recommendations.some(r => r.id === p.id) &&
        (categories.includes(p.category) || brands.includes(p.brand))
      ).slice(0, 4);
      recommendations.push(...personalized);
    }

    const trending = perfumes
      .filter(p => !cartIds.includes(p.id) && !recommendations.some(r => r.id === p.id))
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 4);
    recommendations.push(...trending);

    return recommendations.slice(0, 6);
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Icon name="Sparkles" size={28} className="text-primary" />
          <h2 className="text-3xl font-bold">Рекомендуем для вас</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((perfume) => (
            <Card key={perfume.id} className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                {perfume.discount && perfume.discount > 0 && (
                  <Badge className="absolute top-3 right-3 bg-red-500">
                    -{perfume.discount}%
                  </Badge>
                )}
                {!perfume.availability && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Нет в наличии</span>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="text-sm text-muted-foreground mb-1">{perfume.brand}</div>
                <CardTitle className="text-lg line-clamp-2">{perfume.name}</CardTitle>
                {perfume.rating && (
                  <div className="flex items-center gap-1 text-sm">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{perfume.rating.toFixed(1)}</span>
                    {perfume.reviewsCount && (
                      <span className="text-muted-foreground">({perfume.reviewsCount})</span>
                    )}
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-baseline gap-2 mb-4">
                  {perfume.discount && perfume.discount > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-primary">
                        {(perfume.price * (1 - perfume.discount / 100)).toLocaleString()} ₽
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {perfume.price.toLocaleString()} ₽
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">{perfume.price.toLocaleString()} ₽</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onAddToCart(perfume.id)}
                    disabled={!perfume.availability}
                    className="flex-1"
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onQuickView(perfume)}
                  >
                    <Icon name="Eye" size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationEngine;
