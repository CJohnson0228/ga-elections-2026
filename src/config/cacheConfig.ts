/**
 * Cache Configuration
 * Central location for all cache duration settings
 */

export const CACHE_DURATIONS = {
  /** 1 hour - for GitHub data (candidates, races, metadata) */
  DATA: 60 * 60 * 1000,

  /** 30 minutes - for RSS feeds (more frequent updates) */
  RSS: 30 * 60 * 1000,

  /** 1 hour - for API data (OpenFEC, TransparencyUSA) */
  API: 60 * 60 * 1000,
} as const;

export const CACHE_KEYS = {
  // Candidates
  CANDIDATES_INDEX: "candidates-index",
  CANDIDATE_PREFIX: "candidate-",

  // Races
  RACES_INDEX: "races-index",
  RACE_PREFIX: "race-",

  // News
  RSS_PREFIX: "rss-",
  FEATURED_ARTICLES: "featured-articles",
  RSS_FEEDS: "rss-feeds",

  // Metadata
  LAST_UPDATED: "last-updated",

  // Financial
  OPENFEC_PREFIX: "openfec-",
  TRANSPARENCY_PREFIX: "transparency-",
} as const;
