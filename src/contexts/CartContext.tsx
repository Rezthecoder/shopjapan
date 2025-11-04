/**
 * Cart Context
 * 
 * This context manages the shopping cart functionality.
 * Cart items are persisted in localStorage so they persist across sessions.
 * 
 * Features:
 * - Add/remove items from cart
 * - Update item quantities
 * - Track items by ID and size (for clothing items)
 * - Calculate totals automatically
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Represents a single item in the shopping cart
 */
export interface CartItem {
  id: number; // Product ID
  name: string; // Product name
  price: number; // Product price (in USD)
  image: string; // Product image URL
  quantity: number; // Quantity of this item
  size?: string; // Optional size (for clothing items with sizes)
}

/**
 * Interface for cart context methods and state
 */
interface CartContextType {
  items: CartItem[]; // Array of items in cart
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void; // Add item to cart
  removeFromCart: (id: number, size?: string) => void; // Remove item from cart
  updateQuantity: (id: number, quantity: number, size?: string) => void; // Update item quantity
  clearCart: () => void; // Clear all items from cart
  totalItems: number; // Total number of items (sum of quantities)
  totalPrice: number; // Total price of all items
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Cart Provider Component
 * Wraps the app to provide cart functionality throughout
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage or empty array
  // This runs only once when component mounts
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate that parsed data is an array
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [items]);

  /**
   * Add an item to the cart
   * If item already exists (same ID and size), increases quantity instead
   * @param {Omit<CartItem, 'quantity'> & { quantity?: number }} item - The item to add (quantity is optional, defaults to 1)
   */
  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems((prev) => {
      // Find if item already exists (same ID and size)
      const existingIndex = prev.findIndex(
        (i) => i.id === item.id && i.size === item.size
      );

      if (existingIndex > -1) {
        // Item exists, update quantity
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity || 1;
        return updated;
      }

      // Item doesn't exist, add new item with quantity 1 or specified quantity
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  /**
   * Remove an item from the cart
   * Items are matched by both ID and size (for clothing items)
   * @param {number} id - Product ID
   * @param {string} size - Optional size to match
   */
  const removeFromCart = (id: number, size?: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  /**
   * Update the quantity of an item in the cart
   * @param {number} id - Product ID
   * @param {number} quantity - New quantity (must be >= 1)
   * @param {string} size - Optional size to match
   */
  const updateQuantity = (id: number, quantity: number, size?: string) => {
    if (quantity < 1) return; // Prevent negative or zero quantities

    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity } // Update quantity for matching item
          : item // Keep other items unchanged
      )
    );
  };

  /**
   * Clear all items from the cart
   */
  const clearCart = () => {
    setItems([]);
  };

  // Calculate total number of items (sum of all quantities)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price (sum of price * quantity for all items)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
