/**
 * User Order Storage Utility
 * 
 * This module manages user-specific order history storage.
 * Orders are stored separately for each user (identified by email) in localStorage.
 * This allows users to view their own order history by entering their email.
 */

import { Order } from './orderStorage';

// Base key for storing user orders (email is appended to create unique keys)
const USER_ORDERS_KEY = 'karu_user_orders';

/**
 * User order extends base Order with user identification
 */
export interface UserOrder extends Order {
  userEmail: string; // User's email (used as identifier)
  userName: string; // User's full name
}

/**
 * Save an order for a specific user
 * Orders are stored per user using email as the identifier
 * @param {Order} order - The order to save
 * @param {string} email - User's email (used as storage key)
 * @param {string} name - User's full name
 */
export const saveUserOrder = (order: Order, email: string, name: string): void => {
  try {
    const existingOrders = getUserOrders(email);
    // Create user order with additional user info
    const userOrder: UserOrder = { ...order, userEmail: email, userName: name };
    // Add new order at the beginning (newest first)
    const updatedOrders = [userOrder, ...existingOrders];
    // Store orders with email-specific key: 'karu_user_orders_user@email.com'
    localStorage.setItem(`${USER_ORDERS_KEY}_${email}`, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Error saving user order:', error);
  }
};

/**
 * Get all orders for a specific user
 * @param {string} email - User's email to retrieve orders for
 * @returns {UserOrder[]} Array of user's orders, or empty array if none exist
 */
export const getUserOrders = (email: string): UserOrder[] => {
  try {
    const ordersJson = localStorage.getItem(`${USER_ORDERS_KEY}_${email}`);
    if (!ordersJson) return [];
    return JSON.parse(ordersJson);
  } catch (error) {
    console.error('Error reading user orders:', error);
    return [];
  }
};

/**
 * Get a specific order by order number for a user
 * @param {string} email - User's email
 * @param {string} orderNumber - The order number to find
 * @returns {UserOrder | null} The order if found, null otherwise
 */
export const getUserOrderByNumber = (email: string, orderNumber: string): UserOrder | null => {
  const orders = getUserOrders(email);
  return orders.find(o => o.orderNumber === orderNumber) || null;
};

