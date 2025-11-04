import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatPrice } from "@/utils/priceFormatter";
import { toast } from "sonner";

const Wishlist = () => {
    const { wishlist, removeFromWishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();
    const { language } = useLanguage();

    const handleAddToCart = (product: any) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
        toast.success(`Added ${product.name} to cart`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950 dark:via-purple-950 dark:to-indigo-950">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-2">Wishlist</h1>
                    <p className="text-muted-foreground">
                        {wishlist.length === 0
                            ? "Your wishlist is empty"
                            : `${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} in your wishlist`}
                    </p>
                </div>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20">
                        <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-6 opacity-50" />
                        <h2 className="text-2xl font-bold text-foreground mb-4">Your Wishlist is Empty</h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Start adding products you love to your wishlist. They'll be saved here for easy access later.
                        </p>
                        <Link to="/products">
                            <Button size="lg">
                                Browse Products
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map((product) => (
                            <div key={product.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-xl transition-shadow group">
                                <Link to={`/product/${product.id}`}>
                                    <div className="relative aspect-square overflow-hidden bg-muted">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="h-9 w-9 rounded-full shadow-lg"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    removeFromWishlist(product.id);
                                                    toast.success("Removed from wishlist");
                                                }}
                                            >
                                                <Heart className="h-4 w-4 fill-current" />
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                                <div className="p-5">
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1">
                                        {language === "ja" ? product.categoryJa : product.category}
                                    </p>
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="font-bold text-lg text-foreground mb-3 hover:text-primary transition-colors line-clamp-2">
                                            {language === "ja" ? product.nameJa : product.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center justify-between">
                                        <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                            {formatPrice(product.price)}
                                        </p>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => handleAddToCart(product)}
                                            className="flex items-center gap-2"
                                        >
                                            <ShoppingCart className="h-4 w-4" />
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Wishlist;

