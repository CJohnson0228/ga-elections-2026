/**
 * Candidate data structure
 * Matches the candidate JSON files stored in the GitHub repository
 */
export interface CandidateType {
  id: string;
  name: string;
  party: string;
  race: string; // The raceFilter value (e.g., "ga_governor", "ga_senate_sd18")
  isIncumbent: boolean;
  background: string;
  experience: string[];
  keyIssues: string[];
  website: string | null;
  photoUrl?: string | null; // URL to candidate photo
  endorsements: string[];
  socialMedia: {
    twitter: string | null;
    facebook: string | null;
    instagram: string | null;
  };
  sources: string[];
}

/**
 * Response structure for candidate data from GitHub repository
 */
export interface CandidatesResponseType {
  candidates: CandidateType[];
  lastUpdated: string;
}

/**
 * Race data structure
 * Matches the race JSON files stored in the GitHub repository
 */
export interface RaceType {
  id: string;
  title: string;
  openSeat: boolean;
  subtitle: string;
  aboutContent: string;
  candidatesContent?: string;
  newsTitle: string;
  raceFilter: string;
  raceTags: string[];
  externalIds?: {
    openFEC?: string;
    transparencyUSA?: string;
    ballotpedia?: string;
  };
  electionInfo: {
    primary?: string;
    general?: string;
    termLength?: number;
    district?: string;
    [key: string]: string | number | undefined;
  };
}

/**
 * Response structure for race data from GitHub repository
 */
export interface RacesResponseType {
  races: Record<string, RaceType>;
  lastUpdated: string;
}

/**
 * RSS feed configuration
 * Defines a news feed source with filtering parameters
 */
export interface RSSFeedType {
  id: string;
  name: string;
  url: string;
  category: string;
  priority: number;
  description?: string;
  candidateId?: string;
  raceFilter?: string; // For filtering by specific race
  raceTags?: string[]; // Hierarchical tags for broader filtering
}

/**
 * RSS feed configuration collection
 * Contains all feed sources and search keywords for news aggregation
 */
export interface RSSFeedConfigType {
  feeds: RSSFeedType[];
  searchKeywords: string[];
}

/**
 * Individual news article from RSS feeds
 * Standard structure for all news articles displayed in the app
 */
export interface NewsArticleType {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description?: string;
}

/**
 * Featured news article with enhanced metadata
 * Used for highlighting important campaign news on the homepage
 */
export interface FeaturedArticleType {
  id: string;
  title: string;
  link: string;
  source: string;
  pubDate: string;
  description: string;
  relevance: string;
  category:
    | "ga_governor"
    | "ga_lt_governor"
    | "ga_secretaryofstate"
    | "ga_attorneygeneral"
    | "ga_senate"
    | "ga_house"
    | "us_senate"
    | "us_house"
    | "all";
  imageUrl?: string;
  featured: boolean;
}

/**
 * Response structure for featured articles from GitHub repository
 */
export interface FeaturedArticlesResponseType {
  articles: FeaturedArticleType[];
  lastUpdated?: string;
}

/**
 * Category data structure
 * Defines high-level race categories (e.g., "Governor", "State Senate")
 */
export interface CategoryDataType {
  id: string;
  title: string;
  subtitle: string;
  descriptionHeading: string;
  description: string;
  newsTitle: string;
  raceTags: string[];
}

/**
 * Response structure for category data from GitHub repository
 */
export interface CategoriesResponseType {
  categories: Record<string, CategoryDataType>;
  lastUpdated?: string;
}

/**
 * Data metadata structure
 * Tracks version information and update timestamps for all data sources
 */
export interface DataMetadataType {
  lastUpdated: string;
  updatedBy: string;
  version: string;
  dataVersion: {
    candidates: string;
    endorsements: string;
    news: string;
  };
  notes: string;
}
