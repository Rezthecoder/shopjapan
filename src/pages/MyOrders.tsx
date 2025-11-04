import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserOrders, type UserOrder } from "@/utils/userOrderStorage";
import { formatPrice } from "@/utils/priceFormatter";
import { Package, Eye, Download, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { downloadReceipt } from "@/utils/receiptGenerator";
import { useLanguage } from "@/contexts/LanguageContext";

const MyOrders = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [orders, setOrders] = useState<UserOrder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = () => {
        if (!email.trim()) {
            return;
        }
        const userOrders = getUserOrders(email.trim());
        setOrders(userOrders);
        setHasSearched(true);
    };

    const handleViewDetails = (order: UserOrder) => {
        setSelectedOrder(order);
        setShowDetailsDialog(true);
    };

    const handleDownloadReceipt = (order: UserOrder) => {
        const receiptData = {
            items: order.items,
            subtotal: order.subtotal,
            shipping: order.shipping,
            total: order.total,
            orderNumber: order.orderNumber,
            date: new Date(order.date).toLocaleDateString('ja-JP'),
            customerInfo: order.customerInfo
        };
        downloadReceipt(receiptData);
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'pending': return 'text-yellow-500 bg-yellow-500/10';
            case 'processing': return 'text-blue-500 bg-blue-500/10';
            case 'shipped': return 'text-purple-500 bg-purple-500/10';
            case 'delivered': return 'text-green-500 bg-green-500/10';
            case 'cancelled': return 'text-red-500 bg-red-500/10';
            default: return 'text-gray-500 bg-gray-500/10';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
            <Navbar />

            <main className="container mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-2">My Orders</h1>
                    <p className="text-muted-foreground">View your order history and track your purchases</p>
                </div>

                {/* Search by Email */}
                <div className="bg-card p-6 rounded-lg border border-border mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="mt-1"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Enter the email address you used when placing your order
                            </p>
                        </div>
                        <div className="flex items-end">
                            <Button onClick={handleSearch} size="lg" className="w-full md:w-auto">
                                <Package className="mr-2 h-4 w-4" />
                                View Orders
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                {hasSearched && (
                    <div className="bg-card rounded-lg border border-border">
                        {orders.length === 0 ? (
                            <div className="p-12 text-center">
                                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <p className="text-lg text-muted-foreground mb-2">No orders found</p>
                                <p className="text-sm text-muted-foreground mb-4">
                                    No orders found for {email}. Please check your email address.
                                </p>
                                <Link to="/products">
                                    <Button variant="outline">Continue Shopping</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Order #</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Date</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Items</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Total</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {orders.map((order) => (
                                            <tr key={order.orderNumber} className="hover:bg-muted/50">
                                                <td className="px-6 py-4 text-sm font-medium text-foreground">{order.orderNumber}</td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date(order.date).toLocaleDateString('ja-JP')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-semibold text-foreground">
                                                    {formatPrice(order.total)}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status || 'pending'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleViewDetails(order)}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDownloadReceipt(order)}
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {!hasSearched && (
                    <div className="bg-card p-12 rounded-lg border border-border text-center">
                        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-lg text-muted-foreground">
                            Enter your email address above to view your order history
                        </p>
                    </div>
                )}
            </main>

            {/* Order Details Dialog */}
            <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Order Details - {selectedOrder?.orderNumber}</DialogTitle>
                        <DialogDescription>
                            Order placed on {selectedOrder && new Date(selectedOrder.date).toLocaleString('ja-JP')}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="space-y-6">
                            {/* Order Status */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Order Status</h3>
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                                    {selectedOrder.status || 'pending'}
                                </span>
                            </div>

                            {/* Customer Info */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Shipping Information</h3>
                                <div className="bg-muted p-4 rounded-lg space-y-1">
                                    <p><span className="font-medium">Name:</span> {selectedOrder.customerInfo.name}</p>
                                    <p><span className="font-medium">Email:</span> {selectedOrder.customerInfo.email}</p>
                                    <p><span className="font-medium">Address:</span> {selectedOrder.customerInfo.address}</p>
                                    <p><span className="font-medium">City:</span> {selectedOrder.customerInfo.city}</p>
                                    <p><span className="font-medium">Postal Code:</span> {selectedOrder.customerInfo.zipCode}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Order Items</h3>
                                <div className="space-y-2">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 bg-muted p-4 rounded-lg">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium">{item.name}</p>
                                                {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                                                <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                                <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t border-border pt-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal:</span>
                                        <span className="font-medium">{formatPrice(selectedOrder.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping:</span>
                                        <span className="font-medium">{formatPrice(selectedOrder.shipping)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                                        <span>Total:</span>
                                        <span>{formatPrice(selectedOrder.total)}</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleDownloadReceipt(selectedOrder)}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download Receipt
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MyOrders;

