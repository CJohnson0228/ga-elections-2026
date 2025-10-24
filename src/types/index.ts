// Candidate data structure - matches candidate JSON files in repo
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

export interface CandidatesResponseType {
  candidates: CandidateType[];
  lastUpdated: string;
}

// Race data structure - matches race JSON files in repo
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

export interface RacesResponseType {
  races: Record<string, RaceType>;
  lastUpdated: string;
}

// RSS Feed types
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

export interface RSSFeedConfigType {
  feeds: RSSFeedType[];
  searchKeywords: string[];
}

// News article types
export interface NewsArticleType {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description?: string;
}

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

export interface FeaturedArticlesResponseType {
  articles: FeaturedArticleType[];
  lastUpdated?: string;
}

// Category data structure
export interface CategoryDataType {
  id: string;
  title: string;
  subtitle: string;
  descriptionHeading: string;
  description: string;
  newsTitle: string;
  raceTags: string[];
}

export interface CategoriesResponseType {
  categories: Record<string, CategoryDataType>;
  lastUpdated?: string;
}

// Data metadata type
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
