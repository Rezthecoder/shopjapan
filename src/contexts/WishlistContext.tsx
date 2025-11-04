/**
 * Wishlist Context
 * 
 * This context manages the user's wishlist/favorites functionality.
 * Wishlist items are persisted in localStorage so they persist across sessions.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

/**
 * Interface for wishlist context methods and state
 */
interface WishlistContextType {
    wishlist: Product[]; // Array of products in wishlist
    addToWishlist: (product: Product) => void; // Add product to wishlist
    removeFromWishlist: (productId: number) => void; // Remove product from wishlist
    isInWishlist: (productId: number) => boolean; // Check if product is in wishlist
    toggleWishlist: (product: Product) => void; // Toggle product in/out of wishlist
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

/**
 * Wishlist Provider Component
 * Wraps the app to provide wishlist functionality throughout
 */
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize wishlist from localStorage or empty array
    // This runs only once when component mounts
    const [wishlist, setWishlist] = useState<Product[]>(() => {
        try {
            const saved = localStorage.getItem('wishlist');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Validate that parsed data is an array
                return Array.isArray(parsed) ? parsed : [];
            }
            return [];
        } catch (error) {
            console.error("Error loading wishlist from localStorage:", error);
            return [];
        }
    });

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        } catch (error) {
            console.error("Error saving wishlist to localStorage:", error);
        }
    }, [wishlist]);

    /**
     * Add a product to the wishlist
     * Prevents duplicates - if product already exists, does nothing
     * @param {Product} product - The product to add
     */
    const addToWishlist = (product: Product) => {
        setWishlist((prev) => {
            // Check if product is already in wishlist
            if (prev.find(p => p.id === product.id)) {
                return prev; // Already in wishlist, no change
            }
            // Add new product to wishlist
            return [...prev, product];
        });
    };

    /**
     * Remove a product from the wishlist by ID
     * @param {number} productId - The ID of the product to remove
     */
    const removeFromWishlist = (productId: number) => {
        setWishlist((prev) => prev.filter(p => p.id !== productId));
    };

    /**
     * Check if a product is currently in the wishlist
     * @param {number} productId - The product ID to check
     * @returns {boolean} True if product is in wishlist
     */
    const isInWishlist = (productId: number): boolean => {
        return wishlist.some(p => p.id === productId);
    };

    /**
     * Toggle a product in/out of wishlist
     * If in wishlist, removes it; if not, adds it
     * @param {Product} product - The product to toggle
     */
    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                toggleWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

