// ======================================================
// DEBOUNCE UTILITY FUNCTION
// Limits how often a function can fire (prevents API spam)
// ======================================================

/**
 * Debounce helper
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Wait time in milliseconds
 * @returns {Function}
 */
export default function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
