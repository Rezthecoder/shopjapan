/**
 * Price Formatter Utility
 * 
 * This module provides functions to format prices with thousand separators.
 * Prices are converted from USD to JPY (multiplied by 150) and formatted with commas.
 */

/**
 * Format a price value with thousand separators (commas)
 * @param {number} price - The price value (in USD)
 * @param {number} exchangeRate - Exchange rate to convert to JPY (default: 150)
 * @returns {string} Formatted price string with ¥ symbol and commas (e.g., "¥1,500")
 */
export const formatPrice = (price: number, exchangeRate: number = 150): string => {
  const jpyPrice = price * exchangeRate;
  // Format number with thousand separators (commas)
  return `¥${jpyPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Format a price value without currency symbol
 * @param {number} price - The price value (in USD)
 * @param {number} exchangeRate - Exchange rate to convert to JPY (default: 150)
 * @returns {string} Formatted price string with commas only (e.g., "1,500")
 */
export const formatPriceWithoutSymbol = (price: number, exchangeRate: number = 150): string => {
  const jpyPrice = price * exchangeRate;
  return jpyPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

