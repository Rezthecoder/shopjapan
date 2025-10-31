import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { t } = useLanguage();

  const shipping = totalPrice > 100 ? 0 : 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 dark:from-teal-950 dark:via-cyan-950 dark:to-blue-950">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{t("cart.title")}</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("cart.empty.title")}</h2>
            <p className="text-muted-foreground mb-8">{t("cart.empty.subtitle")}</p>
            <Link to="/products">
              <Button variant="secondary" size="lg">
                {t("cart.empty.cta")}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">{t("cart.summary.title")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product Images */}
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  {items.map((item, idx) => (
                    <img
                      key={`${item.id}-${item.size}-${idx}`}
                      src={item.image}
                      alt={item.name}
                      className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-lg border-4 border-gray-300 dark:border-gray-600 shadow-lg"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/200";
                      }}
                    />
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                    <span className="font-medium">¥{(totalPrice * 150).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("cart.shipping")}</span>
                    <span className="font-medium">{shipping === 0 ? t("cart.shipping.free") : `¥${(shipping * 150).toFixed(0)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t("cart.total")}</span>
                    <span>¥{((totalPrice + shipping) * 150).toFixed(0)}</span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full" size="lg">
                    {t("cart.checkout")}
                  </Button>
                </Link>

                <Link to="/products">
                  <Button variant="outline" className="w-full">
                    {t("cart.continue")}
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground text-center">
                  {t("cart.freeShipping")}
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
