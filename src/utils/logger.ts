/**
 * Logger Utility
 * Centralized logging with environment-aware behavior
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  /**
   * Log general information (only in development)
   */
  info(message: string, ...args: unknown[]): void {
    if (isDevelopment) {
      console.log(`[INFO] ${message}`, ...args);
    }
  },

  /**
   * Log warnings (always shown)
   */
  warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  },

  /**
   * Log errors (always shown)
   */
  error(message: string, error?: unknown): void {
    console.error(`[ERROR] ${message}`, error);
  },

  /**
   * Log debug information (only in development)
   */
  debug(message: string, ...args: unknown[]): void {
    if (isDevelopment) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
};
