import type { NewsArticleType, RSSFeedType } from "../types";

// Use Netlify function - uses relative URL so it works on any host (localhost, network IP, or production)
const RSS_FUNCTION_URL = "/.netlify/functions/fetch-rss";

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

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
    const cacheKey = `rss-${feed.id}`;

    // Check cache
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const cacheItem = JSON.parse(cached);
        const now = Date.now();
        if (now - cacheItem.timestamp < CACHE_DURATION) {
          console.log(`RSS cache hit for ${feed.name}`);
          return cacheItem.data;
        }
      } catch (e) {
        console.error("Cache parse error:", e);
      }
    }

    // Fetch fresh data
    console.log(`Fetching RSS for ${feed.name} via Netlify function`);

    try {
      const url = `${RSS_FUNCTION_URL}?url=${encodeURIComponent(feed.url)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== "ok") {
        throw new Error(`RSS fetch error: ${data.message || "Unknown error"}`);
      }

      const articles: NewsArticleType[] = data.items.map((item: any) => ({
        title: this.cleanGoogleNewsTitle(item.title),
        link: item.link,
        pubDate: item.pubDate,
        source: item.source || item.author || feed.name,
        description: this.stripHTML(item.description || ""),
      }));

      // Cache results
      if (articles.length > 0) {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: articles,
            timestamp: Date.now(),
          })
        );
      }

      return articles;
    } catch (error) {
      console.error(`Error fetching RSS for ${feed.name}:`, error);

      // Return cached data if available, even if expired
      if (cached) {
        try {
          const cacheItem = JSON.parse(cached);
          console.log(`Using stale cache for ${feed.name}`);
          return cacheItem.data;
        } catch (e) {
          // Ignore
        }
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
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith("rss-")) {
        localStorage.removeItem(key);
      }
    });
    console.log("RSS cache cleared");
  }
}

export const rssService = new RSSService();
