/**
 * Logger Utility
 * Centralized logging with environment-aware behavior
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  /**
   * Log general information (only in development)
   * @param message - Message to log
   * @param args - Additional arguments to log
   */
  info(message: string, ...args: unknown[]): void {
    if (isDevelopment) {
      console.log(`[INFO] ${message}`, ...args);
    }
  },

  /**
   * Log warnings (always shown)
   * @param message - Warning message to log
   * @param args - Additional arguments to log
   */
  warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  },

  /**
   * Log errors (always shown)
   * @param message - Error message to log
   * @param error - Optional error object or additional data
   */
  error(message: string, error?: unknown): void {
    console.error(`[ERROR] ${message}`, error);
  },

  /**
   * Log debug information (only in development)
   * @param message - Debug message to log
   * @param args - Additional arguments to log
   */
  debug(message: string, ...args: unknown[]): void {
    if (isDevelopment) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
};
