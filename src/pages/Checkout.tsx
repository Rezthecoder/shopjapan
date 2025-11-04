import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { CreditCard, ArrowLeft, Download, Trash2, Plus, Minus } from "lucide-react";
import { downloadReceipt } from "@/utils/receiptGenerator";
import { saveOrder } from "@/utils/orderStorage";
import { saveUserOrder } from "@/utils/userOrderStorage";
import { formatPrice } from "@/utils/priceFormatter";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";

const Checkout = () => {
  const navigate = useNavigate();
  const { items: cart, clearCart, removeFromCart, updateQuantity } = useCart();
  const { t } = useLanguage();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownloadReceipt = () => {
    const receiptData = {
      items: cart,
      subtotal,
      shipping,
      total,
      orderNumber,
      date: new Date().toLocaleDateString('ja-JP'),
      customerInfo: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode
      }
    };
    downloadReceipt(receiptData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation schema
    const checkoutSchema = z.object({
      firstName: z.string().trim().min(1, "名前を入力してください").max(50, "名前は50文字以内で入力してください"),
      lastName: z.string().trim().min(1, "姓を入力してください").max(50, "姓は50文字以内で入力してください"),
      email: z.string().trim().email("有効なメールアドレスを入力してください").max(255, "メールアドレスは255文字以内で入力してください"),
      address: z.string().trim().min(1, "住所を入力してください").max(200, "住所は200文字以内で入力してください"),
      city: z.string().trim().min(1, "市区町村を入力してください").max(100, "市区町村は100文字以内で入力してください"),
      zipCode: z.string().trim().regex(/^\d{3}-?\d{4}$/, "有効な郵便番号を入力してください（例：123-4567）"),
      cardName: z.string().trim().min(1, "カード名義人を入力してください").max(100, "カード名義人は100文字以内で入力してください"),
      cardNumber: z.string().trim().regex(/^\d{13,19}$/, "有効なカード番号を入力してください（13-19桁の数字）"),
      expiryDate: z.string().trim().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "有効期限をMM/YY形式で入力してください"),
      cvv: z.string().trim().regex(/^\d{3,4}$/, "セキュリティコードは3-4桁の数字で入力してください"),
    });

    // Validate form data
    const validation = checkoutSchema.safeParse(formData);

    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    // Generate order number
    const newOrderNumber = `ORD-${Date.now()}`;
    setOrderNumber(newOrderNumber);

    // Save order to storage for admin view
    const order = {
      orderNumber: newOrderNumber,
      date: new Date().toISOString(),
      customerInfo: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode
      },
      items: cart,
      subtotal,
      shipping,
      total,
      status: 'pending' as const
    };
    saveOrder(order);
    // Save order for user to view later
    saveUserOrder(order, formData.email, `${formData.firstName} ${formData.lastName}`);

    // Show success dialog
    setShowSuccessDialog(true);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-red-100 dark:from-orange-950 dark:via-yellow-950 dark:to-red-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t("checkout.empty.title")}</h2>
          <Button onClick={() => navigate("/products")}>{t("checkout.empty.cta")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/cart")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("checkout.back")}
        </Button>

        <h1 className="text-4xl font-bold text-foreground mb-8">{t("checkout.title")}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-2xl font-semibold text-foreground mb-6">{t("checkout.shipping.title")}</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{t("checkout.firstName")} {t("checkout.required")}</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t("checkout.lastName")} {t("checkout.required")}</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="email">{t("checkout.email")} {t("checkout.required")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">{t("checkout.address")} {t("checkout.required")}</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">{t("checkout.city")} {t("checkout.required")}</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">{t("checkout.zipCode")} {t("checkout.required")}</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">{t("checkout.payment.title")}</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">{t("checkout.cardName")} {t("checkout.required")}</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder=""
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">{t("checkout.cardNumber")} {t("checkout.required")}</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">{t("checkout.expiryDate")} {t("checkout.required")}</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">{t("checkout.cvv")} {t("checkout.required")}</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        type="password"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                <CreditCard className="mr-2 h-5 w-5" />
                {formatPrice(total)} - {t("checkout.submit")}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card p-6 rounded-lg border border-border sticky top-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">{t("checkout.summary.title")}</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
                      {item.size && (
                        <p className="text-xs text-muted-foreground">{t("checkout.summary.size")}: {item.size}</p>
                      )}
                      <p className="text-sm font-semibold text-foreground mt-2">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => {
                          removeFromCart(item.id, item.size);
                          toast.success("Item removed from cart");
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1, item.size)}
                          className="w-14 text-center h-7"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>{t("checkout.summary.subtotal")}</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t("checkout.summary.shipping")}</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-foreground pt-2 border-t border-border">
                  <span>{t("checkout.summary.total")}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Dialog with Receipt Download */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("checkout.success.title")}</DialogTitle>
              <DialogDescription>
                {t("checkout.success.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{t("checkout.success.orderNumber")}</p>
                <p className="text-lg font-bold">{orderNumber}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={handleDownloadReceipt} className="w-full">
                  <Download className="mr-2 h-5 w-5" />
                  {t("checkout.success.download")}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowSuccessDialog(false);
                    clearCart();
                    navigate("/");
                  }}
                  className="w-full"
                >
                  {t("checkout.success.home")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Checkout;
