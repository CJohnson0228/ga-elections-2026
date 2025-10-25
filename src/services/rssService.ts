import type { NewsArticleType, RSSFeedType } from "../types";
import type { RSSFunctionResponseType, RSSItemType } from "../types/rss";
import { cacheManager } from "../utils/cacheManager";
import { logger } from "../utils/logger";
import { API_CONFIG, CACHE_DURATIONS, CACHE_KEYS } from "../config";

/**
 * RSS Service
 *
 * Fetches and processes RSS news feeds from Georgia media outlets.
 * Uses a Netlify serverless function to proxy RSS requests and avoid CORS issues.
 * Processes feeds from sources like Georgia Recorder, AJC, GPB News, etc.
 * Caches feed data in localStorage to reduce serverless function calls.
 */
class RSSService {
  private cleanGoogleNewsTitle(title: string): string {
    // Google News titles often have " - Source Name" at the end
    return title.replace(/\s-\s[^-]+$/, "").trim();
  }

  private stripHTML(html: string): string {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  async fetchFeed(feed: RSSFeedType): Promise<NewsArticleType[]> {
    const cacheKey = `${CACHE_KEYS.RSS_PREFIX}${feed.id}`;

    // Check cache
    const cached = cacheManager.get<NewsArticleType[]>(cacheKey, {
      duration: CACHE_DURATIONS.RSS,
    });
    if (cached !== null) {
      return cached;
    }

    // Fetch fresh data
    logger.info(`Fetching RSS for ${feed.name} via Netlify function`);

    try {
      const url = `${API_CONFIG.NETLIFY_FUNCTIONS_BASE}/fetch-rss?url=${encodeURIComponent(feed.url)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: RSSFunctionResponseType = await response.json();

      if (data.status !== "ok") {
        throw new Error(`RSS fetch error: ${data.message || "Unknown error"}`);
      }

      const articles: NewsArticleType[] = data.items.map((item: RSSItemType) => ({
        title: this.cleanGoogleNewsTitle(item.title),
        link: item.link,
        pubDate: item.pubDate,
        source: item.source || item.author || feed.name,
        description: this.stripHTML(item.description || ""),
      }));

      // Cache results
      if (articles.length > 0) {
        cacheManager.set(cacheKey, articles, { duration: CACHE_DURATIONS.RSS });
      }

      return articles;
    } catch (error) {
      logger.error(`Error fetching RSS for ${feed.name}`, error);

      // Return stale cache if available
      const staleCache = cacheManager.get<NewsArticleType[]>(cacheKey, {
        duration: Infinity, // Get even if expired
      });
      if (staleCache !== null) {
        logger.info(`Using stale cache for ${feed.name}`);
        return staleCache;
      }

      return [];
    }
  }

  async fetchByCategory(
    feeds: RSSFeedType[],
    category: string,
    limit: number = 5
  ): Promise<NewsArticleType[]> {
    const categoryFeeds = feeds.filter((f) => f.category === category);
    return this.fetchMultipleFeeds(categoryFeeds, limit);
  }

  async fetchByRaceFilter(
    feeds: RSSFeedType[],
    raceFilter: string | string[],
    limit: number = 10
  ): Promise<NewsArticleType[]> {
    const filters = Array.isArray(raceFilter) ? raceFilter : [raceFilter];

    const matchingFeeds = feeds.filter((feed) => {
      // If this is a single raceFilter (from a race page):
      // - Match feeds with exact raceFilter
      // - Include feeds with "all" tag (general news)
      if (!Array.isArray(raceFilter)) {
        if (feed.raceFilter === raceFilter) {
          return true;
        }
        if (feed.raceTags && feed.raceTags.includes("all")) {
          return true;
        }
        return false;
      }

      // If this is an array of raceTags (from a category page):
      // - Match feeds where ANY feed.raceTags intersects with the category raceTags
      // - Include feeds with "all" tag
      if (feed.raceTags) {
        if (feed.raceTags.includes("all")) {
          return true;
        }
        // Check if any feed tag matches any category tag
        return feed.raceTags.some((tag) => filters.includes(tag));
      }

      return false;
    });

    return this.fetchMultipleFeeds(matchingFeeds, limit);
  }

  async fetchByCandidateId(
    feeds: RSSFeedType[],
    candidateId: string,
    limit: number = 5
  ): Promise<NewsArticleType[]> {
    const candidateFeeds = feeds.filter((f) => f.candidateId === candidateId);
    return this.fetchMultipleFeeds(candidateFeeds, limit);
  }

  async fetchMultipleFeeds(
    feeds: RSSFeedType[],
    limit: number = 10
  ): Promise<NewsArticleType[]> {
    const allArticles: NewsArticleType[] = [];

    // Fetch feeds in parallel (Google News can handle it)
    const results = await Promise.allSettled(
      feeds.map((feed) => this.fetchFeed(feed))
    );

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        allArticles.push(...result.value);
      }
    });

    // Sort by date (newest first)
    allArticles.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });

    // Remove duplicates by title
    const uniqueArticles = allArticles.filter(
      (article, index, self) =>
        index === self.findIndex((a) => a.title === article.title)
    );

    return uniqueArticles.slice(0, limit);
  }

  clearCache(): void {
    cacheManager.clearByPrefix(CACHE_KEYS.RSS_PREFIX);
    logger.info("RSS cache cleared");
  }
}

export const rssService = new RSSService();
