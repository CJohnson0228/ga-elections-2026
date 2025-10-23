import { dataService } from "../../../services/dataService";
import { rssService } from "../../../services/rssService";
import type { FeaturedArticleType, NewsArticleType } from "../../../types";

interface fetchNewsProps {
  raceFilter?: string | string[]; // Can be a specific filter, array of tags, or "all"
  candidateId?: string;
  setFeaturedArticles: React.Dispatch<
    React.SetStateAction<FeaturedArticleType[]>
  >;
  setLiveArticles: React.Dispatch<React.SetStateAction<NewsArticleType[]>>;
  setLastUpdated: React.Dispatch<React.SetStateAction<Date | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}

const fetchNews = async ({
  raceFilter = "all",
  candidateId,
  setFeaturedArticles,
  setLiveArticles,
  setLastUpdated,
  setLoading,
  setRefreshing,
}: fetchNewsProps) => {
  try {
    // Fetch featured articles
    const allFeatured = await dataService.getFeaturedArticles();

    // Filter featured articles by race
    const filtered =
      raceFilter === "all"
        ? allFeatured.articles || []
        : (allFeatured.articles || []).filter(
            (article: FeaturedArticleType) => {
              if (Array.isArray(raceFilter)) {
                // Check if article category matches any of the filters
                return raceFilter.includes(article.category) || article.category === "all";
              }
              return article.category === raceFilter || article.category === "all";
            }
          );

    setFeaturedArticles(filtered.slice(0, 4));

    // Fetch RSS feed configuration
    const feedConfig = await dataService.getRSSFeeds();

    // Fetch live articles based on filter
    let liveNews: NewsArticleType[] = [];

    if (candidateId) {
      liveNews = await rssService.fetchByCandidateId(
        feedConfig.feeds,
        candidateId,
        10
      );
    } else if (raceFilter && raceFilter !== "all") {
      // Use the new fetchByRaceFilter method that handles both strings and arrays
      liveNews = await rssService.fetchByRaceFilter(
        feedConfig.feeds,
        raceFilter,
        10
      );
    } else {
      liveNews = await rssService.fetchMultipleFeeds(feedConfig.feeds, 10);
    }

    setLiveArticles(liveNews);
    setLastUpdated(new Date());
  } catch (err) {
    console.error("Error fetching news:", err);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

// Format relative time - always use relative format
const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes < 1 ? "Just now" : `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  } else if (diffInDays === 1) {
    return "1 day ago";
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
};

// Get category badge color
const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    governor: "bg-primary-100 text-primary-700",
    "lt-governor": "bg-success-500/20 text-success-600",
    "state-senate": "bg-caution-400/20 text-caution-600",
    "state-house": "bg-note-400/20 text-note-600",
    "us-senate": "bg-warning-500/20 text-warning-600",
    all: "bg-gray-100 text-gray-700",
  };
  return colorMap[category] || "bg-gray-100 text-gray-700";
};

// Get category label
const getCategoryLabel = (category: string): string => {
  const labelMap: Record<string, string> = {
    governor: "Governor",
    "lt-governor": "Lt. Governor",
    "state-senate": "State Senate",
    "state-house": "State House",
    "us-senate": "U.S. Senate",
    all: "General",
  };
  return labelMap[category] || category;
};

export { getCategoryColor, getCategoryLabel, getRelativeTime, fetchNews };
