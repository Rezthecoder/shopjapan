/**
 * Admin Authentication Utility
 * 
 * This module handles admin authentication using password-based login.
 * Authentication state is stored in localStorage with a 24-hour expiration.
 * 
 * Security Note: This is a basic frontend-only authentication. For production,
 * use proper backend authentication with secure token-based auth.
 */

// Key used to store admin authentication timestamp in localStorage
const ADMIN_PASSWORD_KEY = 'karu_admin_authenticated';

/**
 * Get admin password from environment variable
 * In Vite, client-side env variables must be prefixed with VITE_
 * Set this in your .env file: VITE_ADMIN_PASSWORD=your_password
 */
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

/**
 * Check if admin is currently authenticated
 * @returns {boolean} True if admin is authenticated and session hasn't expired
 */
export const isAdminAuthenticated = (): boolean => {
  // Get the authentication timestamp from localStorage
  const authTime = localStorage.getItem(ADMIN_PASSWORD_KEY);
  if (!authTime) return false;
  
  // Calculate time difference since authentication
  const timeDiff = Date.now() - parseInt(authTime);
  const hours24 = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  
  // If more than 24 hours have passed, session expired
  if (timeDiff > hours24) {
    localStorage.removeItem(ADMIN_PASSWORD_KEY);
    return false;
  }
  
  return true;
};

/**
 * Authenticate admin with password
 * @param {string} password - The password to check
 * @returns {boolean} True if password matches and authentication succeeds
 */
export const authenticateAdmin = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    // Store current timestamp to track session expiration
    localStorage.setItem(ADMIN_PASSWORD_KEY, Date.now().toString());
    return true;
  }
  return false;
};

/**
 * Logout admin and clear authentication
 */
export const logoutAdmin = (): void => {
  localStorage.removeItem(ADMIN_PASSWORD_KEY);
};

