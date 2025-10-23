// Type exports
export type Party = "Democratic" | "Republican" | "Independent" | "Other";
export type RaceType =
  | "ga_governor"
  | "ga_lt_governor"
  | "ga_secretaryofstate"
  | "ga_attorneygeneral"
  | "ga_senate"
  | "ga_house"
  | "us_senate"
  | "us_house"
  | "other";

export interface Candidate {
  id: string;
  name: string;
  party: Party;
  race: RaceType;
  imageUrl?: string;
  bio?: string;
  website?: string;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  endorsements?: string[];
  policyPositions?: PolicyPosition[];
  fundraising?: FundraisingData;
  sources?: string[];
}

export interface PolicyPosition {
  category: string;
  title: string;
  description: string;
  source?: string;
}

export interface FundraisingData {
  totalRaised: number;
  totalSpent: number;
  cashOnHand: number;
  smallDonorContributions?: number;
  largeDonorContributions?: number;
  lastUpdated: string;
  quarterlyReports?: QuarterlyReport[];
}

export interface QuarterlyReport {
  quarter: string;
  year: number;
  raised: number;
  spent: number;
}

export interface PollingLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  hours?: string;
  earlyVoting?: boolean;
}

export interface Race {
  id: string;
  title: string;
  description: string;
  electionDate: string;
  candidates: Candidate[];
}

// GitHub data structure types - matches candidate JSON files in repo
export interface GitHubCandidate {
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

export interface CandidateData {
  candidates: GitHubCandidate[];
  lastUpdated: string;
}

// GitHub race data structure - matches race JSON files in repo
export interface GitHubRace {
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

export interface RacesData {
  races: Record<string, GitHubRace>;
  lastUpdated: string;
}

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

export interface RSSFeedConfig {
  feeds: RSSFeedType[];
  searchKeywords: string[];
}

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

export interface LastUpdated {
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

// Helper function to convert GitHubCandidate to Candidate format
export function githubCandidateToCandidate(
  ghCandidate: GitHubCandidate,
  raceType: RaceType
): Candidate {
  return {
    id: ghCandidate.id,
    name: ghCandidate.name,
    party: ghCandidate.party as Party,
    race: raceType,
    bio: ghCandidate.background,
    website: ghCandidate.website || undefined,
    socialMedia: {
      twitter: ghCandidate.socialMedia.twitter || undefined,
      facebook: ghCandidate.socialMedia.facebook || undefined,
      instagram: ghCandidate.socialMedia.instagram || undefined,
    },
    endorsements: ghCandidate.endorsements,
    policyPositions: ghCandidate.keyIssues.map((issue) => ({
      category: "Policy",
      title: issue,
      description: issue,
    })),
  };
}
