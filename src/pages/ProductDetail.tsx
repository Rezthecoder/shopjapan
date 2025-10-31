import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ArrowLeft, Plus, Minus, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-fuchsia-100 dark:from-rose-950 dark:via-pink-950 dark:to-fuchsia-950">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size", {
        duration: 5000,
        style: {
          fontSize: '20px',
          padding: '20px',
          background: '#ef4444',
          color: 'white',
          fontWeight: 'bold',
        },
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize || undefined,
      quantity,
    });

    toast.success(`Added to cart! ${quantity} × ${product.name} ${selectedSize ? `(${selectedSize})` : ''}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 dark:from-violet-950 dark:via-purple-950 dark:to-indigo-950">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-foreground mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className="min-w-[60px]"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
