import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 h-full">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <div className="w-full">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-1">
              {product.name}
            </h3>
            <p className="text-lg font-bold text-foreground mt-2">${product.price.toFixed(2)}</p>
          </div>
          <Button variant="secondary" className="w-full" size="sm">
            詳細を見る
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
