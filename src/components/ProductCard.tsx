/**
 * ProductCard Component
 * 
 * Displays a product card with image, name, category, and price.
 * Supports wishlist functionality and language switching (English/Japanese).
 * 
 * Features:
 * - Hover effects with image zoom and button reveal
 * - Wishlist heart icon (shows filled when in wishlist)
 * - Language-aware product name and category display
 * - Formatted price with thousand separators
 */

import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatPrice } from "@/utils/priceFormatter";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product; // Product data to display
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { language } = useLanguage();
  const inWishlist = isInWishlist(product.id);

  // Get localized product name and category based on current language
  const displayName = language === "ja" ? product.nameJa : product.name;
  const displayCategory = language === "ja" ? product.categoryJa : product.category;

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`}>
        <Card className="relative overflow-hidden border-border hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 h-full bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-0">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <Button variant="secondary" className="w-full shadow-lg font-semibold" size="sm">
                  詳細を見る
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3 p-5">
            <div className="w-full">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{displayCategory}</p>
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mt-2 line-clamp-2">
                {displayName}
              </h3>
              <div className="flex items-baseline gap-2 mt-3">
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </CardFooter>
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              NEW
            </div>
          </div>
        </Card>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 left-3 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
      >
        <Heart className={`h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
      </Button>
    </div>
  );
};

export default ProductCard;
