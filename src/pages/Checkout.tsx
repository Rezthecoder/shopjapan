import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, ArrowLeft, Download } from "lucide-react";
import { downloadReceipt } from "@/utils/receiptGenerator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Checkout = () => {
  const navigate = useNavigate();
  const { items: cart, clearCart } = useCart();
  const { toast } = useToast();
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
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.address || !formData.city || !formData.zipCode ||
        !formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      toast({
        title: "情報不足",
        description: "すべての必須項目を入力してください",
        variant: "destructive"
      });
      return;
    }

    // Generate order number
    const newOrderNumber = `ORD-${Date.now()}`;
    setOrderNumber(newOrderNumber);
    
    // Show success dialog
    setShowSuccessDialog(true);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">カートが空です</h2>
          <Button onClick={() => navigate("/products")}>買い物を続ける</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/cart")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          カートに戻る
        </Button>

        <h1 className="text-4xl font-bold text-foreground mb-8">お支払い</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-2xl font-semibold text-foreground mb-6">配送先情報</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">名 *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">姓 *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="email">メールアドレス *</Label>
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
                    <Label htmlFor="address">住所 *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">市区町村 *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">郵便番号 *</Label>
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
                  <h2 className="text-2xl font-semibold text-foreground">お支払い情報</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardName">カード名義人 *</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="山田 太郎"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">カード番号 *</Label>
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
                      <Label htmlFor="expiryDate">有効期限 *</Label>
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
                      <Label htmlFor="cvv">セキュリティコード *</Label>
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
                ¥{(total * 150).toFixed(0)} - お支払いを完了
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card p-6 rounded-lg border border-border sticky top-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6">注文概要</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
                      {item.size && (
                        <p className="text-xs text-muted-foreground">サイズ: {item.size}</p>
                      )}
                      <p className="text-sm text-muted-foreground">数量: {item.quantity}</p>
                      <p className="text-sm font-semibold text-foreground">
                        ¥{(item.price * item.quantity * 150).toFixed(0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>小計</span>
                  <span>¥{(subtotal * 150).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>配送料</span>
                  <span>¥{(shipping * 150).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-foreground pt-2 border-t border-border">
                  <span>合計</span>
                  <span>¥{(total * 150).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Dialog with Receipt Download */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ご注文ありがとうございます！</DialogTitle>
              <DialogDescription>
                ご注文が正常に完了しました。確認メールをお送りしました。
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">注文番号</p>
                <p className="text-lg font-bold">{orderNumber}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={handleDownloadReceipt} className="w-full">
                  <Download className="mr-2 h-5 w-5" />
                  領収書をダウンロード
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
                  ホームに戻る
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
