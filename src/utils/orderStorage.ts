/**
 * Order Storage Utility
 * 
 * This module manages order data storage in localStorage for admin viewing.
 * All orders are stored in a single array and can be managed by admins.
 */

/**
 * Represents a single item in an order
 */
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string; // Optional size (for clothing items)
}

/**
 * Represents a complete order with customer information and items
 */
export interface Order {
  orderNumber: string; // Unique order identifier (e.g., "ORD-1234567890")
  date: string; // ISO date string when order was placed
  customerInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
  items: OrderItem[]; // Array of products in the order
  subtotal: number; // Subtotal before shipping
  shipping: number; // Shipping cost
  total: number; // Final total (subtotal + shipping)
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'; // Order status
}

// Key used to store all orders in localStorage
const STORAGE_KEY = 'karu_orders';

/**
 * Save a new order to localStorage
 * Orders are stored with newest first (prepended to array)
 * @param {Order} order - The order object to save
 */
export const saveOrder = (order: Order): void => {
  try {
    const existingOrders = getOrders();
    // Add new order at the beginning of the array (newest first)
    const updatedOrders = [order, ...existingOrders];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Error saving order:', error);
  }
};

/**
 * Get all orders from localStorage
 * @returns {Order[]} Array of all orders, or empty array if none exist
 */
export const getOrders = (): Order[] => {
  try {
    const ordersJson = localStorage.getItem(STORAGE_KEY);
    if (!ordersJson) return [];
    return JSON.parse(ordersJson);
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
};

/**
 * Delete an order by order number
 * @param {string} orderNumber - The unique order number to delete
 */
export const deleteOrder = (orderNumber: string): void => {
  try {
    const orders = getOrders();
    // Filter out the order with matching order number
    const filteredOrders = orders.filter(order => order.orderNumber !== orderNumber);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredOrders));
  } catch (error) {
    console.error('Error deleting order:', error);
  }
};

/**
 * Update the status of an order
 * @param {string} orderNumber - The unique order number
 * @param {Order['status']} status - The new status to set
 */
export const updateOrderStatus = (orderNumber: string, status: Order['status']): void => {
  try {
    const orders = getOrders();
    // Map through orders and update the matching one
    const updatedOrders = orders.map(order => 
      order.orderNumber === orderNumber ? { ...order, status } : order
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};

