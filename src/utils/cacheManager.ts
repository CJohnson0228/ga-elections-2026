/**
 * Cache Manager Utility
 * Unified caching solution for all services
 */

import { logger } from "./logger";

export interface CacheItemType<T> {
  data: T;
  timestamp: number;
}

export interface CacheOptions {
  duration: number; // milliseconds
  storage?: "localStorage" | "memory";
}

/**
 * Cache Manager for handling data caching
 */
export class CacheManager {
  private memoryCache = new Map<string, CacheItemType<unknown>>();
  private defaultOptions: CacheOptions;

  constructor(options?: Partial<CacheOptions>) {
    this.defaultOptions = {
      duration: 60 * 60 * 1000, // 1 hour default
      storage: "localStorage",
      ...options,
    };
  }

  /**
   * Get cached data if available and not expired
   */
  get<T>(key: string, options?: Partial<CacheOptions>): T | null {
    const opts = { ...this.defaultOptions, ...options };
    const now = Date.now();

    if (opts.storage === "memory") {
      const cached = this.memoryCache.get(key);
      if (cached && now - cached.timestamp < opts.duration) {
        logger.debug(`Memory cache hit for ${key}`);
        return cached.data as T;
      }
      return null;
    }

    // localStorage
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const cacheItem: CacheItemType<T> = JSON.parse(cached);
        if (now - cacheItem.timestamp < opts.duration) {
          logger.debug(`LocalStorage cache hit for ${key}`);
          return cacheItem.data;
        }
      }
    } catch (error) {
      logger.error(`Error reading cache for ${key}`, error);
    }

    return null;
  }

  /**
   * Store data in cache
   */
  set<T>(key: string, data: T, options?: Partial<CacheOptions>): void {
    const opts = { ...this.defaultOptions, ...options };
    const cacheItem: CacheItemType<T> = {
      data,
      timestamp: Date.now(),
    };

    if (opts.storage === "memory") {
      this.memoryCache.set(key, cacheItem as CacheItemType<unknown>);
      logger.debug(`Cached in memory: ${key}`);
      return;
    }

    // localStorage
    try {
      localStorage.setItem(key, JSON.stringify(cacheItem));
      logger.debug(`Cached in localStorage: ${key}`);
    } catch (error) {
      logger.error(`Error caching ${key}`, error);
    }
  }

  /**
   * Remove specific cache entry
   */
  remove(key: string, options?: Partial<CacheOptions>): void {
    const opts = { ...this.defaultOptions, ...options };

    if (opts.storage === "memory") {
      this.memoryCache.delete(key);
      return;
    }

    localStorage.removeItem(key);
  }

  /**
   * Clear all cache entries matching a prefix
   */
  clearByPrefix(prefix: string, options?: Partial<CacheOptions>): void {
    const opts = { ...this.defaultOptions, ...options };

    if (opts.storage === "memory") {
      const keysToDelete: string[] = [];
      this.memoryCache.forEach((_, key) => {
        if (key.startsWith(prefix)) {
          keysToDelete.push(key);
        }
      });
      keysToDelete.forEach((key) => this.memoryCache.delete(key));
      logger.info(`Cleared ${keysToDelete.length} memory cache entries with prefix: ${prefix}`);
      return;
    }

    // localStorage
    const keys = Object.keys(localStorage);
    let count = 0;
    keys.forEach((key) => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
        count++;
      }
    });
    logger.info(`Cleared ${count} localStorage entries with prefix: ${prefix}`);
  }

  /**
   * Clear all cache
   */
  clearAll(options?: Partial<CacheOptions>): void {
    const opts = { ...this.defaultOptions, ...options };

    if (opts.storage === "memory") {
      this.memoryCache.clear();
      logger.info("Cleared all memory cache");
      return;
    }

    localStorage.clear();
    logger.info("Cleared all localStorage");
  }

  /**
   * Fetch with cache - combines fetch and cache logic
   */
  async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    options?: Partial<CacheOptions>
  ): Promise<T> {
    // Check cache first
    const cached = this.get<T>(cacheKey, options);
    if (cached !== null) {
      return cached;
    }

    // Fetch fresh data
    logger.info(`Fetching fresh data for ${cacheKey}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const data: T = await response.json();

    // Cache the result
    this.set(cacheKey, data, options);

    return data;
  }
}

/**
 * Default cache manager instance
 */
export const cacheManager = new CacheManager();
