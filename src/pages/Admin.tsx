import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getOrders, deleteOrder, updateOrderStatus, type Order } from "@/utils/orderStorage";
import { isAdminAuthenticated, authenticateAdmin, logoutAdmin } from "@/utils/adminAuth";
import { formatPrice } from "@/utils/priceFormatter";
import { Trash2, Package, Eye, Lock, LogOut, Search, Download, Filter, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Admin = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    useEffect(() => {
        // Check if admin is already authenticated
        if (isAdminAuthenticated()) {
            setIsAuthenticated(true);
            loadOrders();
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (authenticateAdmin(password)) {
            setIsAuthenticated(true);
            loadOrders();
            toast.success("Admin access granted");
            setPassword("");
        } else {
            toast.error("Invalid password");
            setPassword("");
        }
    };

    const handleLogout = () => {
        logoutAdmin();
        setIsAuthenticated(false);
        navigate("/");
        toast.success("Logged out successfully");
    };

    const loadOrders = () => {
        const allOrders = getOrders();
        setOrders(allOrders);
        setFilteredOrders(allOrders);
    };

    // Filter and search orders
    useEffect(() => {
        let filtered = [...orders];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(order =>
                order.orderNumber.toLowerCase().includes(query) ||
                order.customerInfo.name.toLowerCase().includes(query) ||
                order.customerInfo.email.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Date range filter
        if (dateFrom) {
            const fromDate = new Date(dateFrom);
            filtered = filtered.filter(order => new Date(order.date) >= fromDate);
        }
        if (dateTo) {
            const toDate = new Date(dateTo);
            toDate.setHours(23, 59, 59, 999); // Include entire end date
            filtered = filtered.filter(order => new Date(order.date) <= toDate);
        }

        setFilteredOrders(filtered);
    }, [orders, searchQuery, statusFilter, dateFrom, dateTo]);

    const exportToCSV = () => {
        const headers = ['Order Number', 'Date', 'Customer Name', 'Email', 'Address', 'City', 'Postal Code', 'Items', 'Subtotal', 'Shipping', 'Total', 'Status'];
        const rows = filteredOrders.map(order => [
            order.orderNumber,
            new Date(order.date).toLocaleDateString('ja-JP'),
            order.customerInfo.name,
            order.customerInfo.email,
            order.customerInfo.address,
            order.customerInfo.city,
            order.customerInfo.zipCode,
            order.items.map(i => `${i.name} (${i.quantity}x)`).join('; '),
            (order.subtotal * 150).toFixed(0),
            (order.shipping * 150).toFixed(0),
            (order.total * 150).toFixed(0),
            order.status || 'pending'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Orders exported to CSV');
    };

    const handleDeleteClick = (orderNumber: string) => {
        setOrderToDelete(orderNumber);
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        if (orderToDelete) {
            deleteOrder(orderToDelete);
            loadOrders();
            setShowDeleteDialog(false);
            setOrderToDelete(null);
            toast.success('Order deleted successfully');
        }
    };

    const handleStatusChange = (orderNumber: string, status: Order['status']) => {
        updateOrderStatus(orderNumber, status);
        loadOrders();
    };

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setShowDetailsDialog(true);
    };

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const processingOrders = orders.filter(o => o.status === 'processing').length;
    const shippedOrders = orders.filter(o => o.status === 'shipped').length;
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Show login form if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950">
                <Navbar />
                <main className="container mx-auto px-4 py-20">
                    <div className="max-w-md mx-auto">
                        <div className="bg-card p-8 rounded-lg border border-border shadow-lg">
                            <div className="flex items-center justify-center mb-6">
                                <div className="bg-primary/10 p-4 rounded-full">
                                    <Lock className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Admin Login</h1>
                            <p className="text-muted-foreground text-center mb-6">
                                Enter admin password to access the dashboard
                            </p>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter admin password"
                                        className="mt-1"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" size="lg">
                                    <Lock className="mr-2 h-4 w-4" />
                                    Login
                                </Button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
                        <p className="text-muted-foreground">View and manage all customer orders</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-card p-6 rounded-lg border border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Orders</p>
                                <p className="text-3xl font-bold text-foreground">{totalOrders}</p>
                            </div>
                            <Package className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-lg border border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Revenue</p>
                                <p className="text-3xl font-bold text-foreground">{formatPrice(totalRevenue)}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-lg border border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Average Order</p>
                                <p className="text-3xl font-bold text-foreground">{formatPrice(averageOrderValue)}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-lg border border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Pending Orders</p>
                                <p className="text-3xl font-bold text-foreground">{pendingOrders}</p>
                            </div>
                            <Package className="h-8 w-8 text-yellow-500" />
                        </div>
                    </div>
                </div>

                {/* Status Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="bg-card p-4 rounded-lg border border-border text-center">
                        <p className="text-2xl font-bold text-yellow-500">{pendingOrders}</p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border text-center">
                        <p className="text-2xl font-bold text-blue-500">{processingOrders}</p>
                        <p className="text-xs text-muted-foreground">Processing</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border text-center">
                        <p className="text-2xl font-bold text-purple-500">{shippedOrders}</p>
                        <p className="text-xs text-muted-foreground">Shipped</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border text-center">
                        <p className="text-2xl font-bold text-green-500">{deliveredOrders}</p>
                        <p className="text-xs text-muted-foreground">Delivered</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border border-border text-center">
                        <p className="text-2xl font-bold text-red-500">{orders.filter(o => o.status === 'cancelled').length}</p>
                        <p className="text-xs text-muted-foreground">Cancelled</p>
                    </div>
                </div>

                {/* Orders List */}
                <div className="bg-card rounded-lg border border-border">
                    <div className="p-6 border-b border-border">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <h2 className="text-2xl font-semibold text-foreground">
                                All Orders ({filteredOrders.length})
                            </h2>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={exportToCSV}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export CSV
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="p-6 border-b border-border space-y-4 bg-muted/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search orders, customers..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="date"
                                    placeholder="From date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="date"
                                    placeholder="To date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        {(searchQuery || statusFilter !== "all" || dateFrom || dateTo) && (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setStatusFilter("all");
                                        setDateFrom("");
                                        setDateTo("");
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        {filteredOrders.length === 0 ? (
                            <div className="p-12 text-center">
                                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                                <p className="text-lg text-muted-foreground">
                                    {orders.length === 0 ? "No orders yet" : "No orders match your filters"}
                                </p>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Order #</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Date</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Customer</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Items</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Total</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.orderNumber} className="hover:bg-muted/50">
                                            <td className="px-6 py-4 text-sm font-medium text-foreground">{order.orderNumber}</td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                {new Date(order.date).toLocaleDateString('ja-JP')}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                <div>
                                                    <div className="font-medium">{order.customerInfo.name}</div>
                                                    <div className="text-xs">{order.customerInfo.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-foreground">
                                                {formatPrice(order.total)}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <Select
                                                    value={order.status || 'pending'}
                                                    onValueChange={(value) => handleStatusChange(order.orderNumber, value as Order['status'])}
                                                >
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">Pending</SelectItem>
                                                        <SelectItem value="processing">Processing</SelectItem>
                                                        <SelectItem value="shipped">Shipped</SelectItem>
                                                        <SelectItem value="delivered">Delivered</SelectItem>
                                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
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
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(order.orderNumber)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
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
                            {/* Customer Info */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Customer Information</h3>
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
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Order</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete order {orderToDelete}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => {
                            setShowDeleteDialog(false);
                            setOrderToDelete(null);
                        }}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Admin;

