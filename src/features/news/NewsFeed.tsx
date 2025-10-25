import { useState, useEffect } from "react";
import { Link } from "react-router";
import { RefreshCw, Newspaper, MoveRight } from "lucide-react";
import type { FeaturedArticleType, NewsArticleType } from "../../types";
import Card from "../../components/ui/Card";
import { fetchNews } from "./utils/newsUtils";
import FeaturedArticle from "./components/FeaturedArticle";
import LiveArticle from "./components/LiveArticle";

interface NewsFeedProps {
  raceFilter?: string | string[]; // Can be a specific filter, array of tags, or "all"
  candidateId?: string;
  showAllNews?: boolean; // If true, shows both featured and latest news. If false, only featured.
  limit?: number; // Limit number of live articles to display (0 = show all)
  sectionTitle?: string;
  sectionSubTitle?: string;
}

export default function NewsFeed({
  raceFilter = "all",
  candidateId,
  showAllNews = false,
  limit = 0,
  sectionTitle = "Election News",
  sectionSubTitle = "Stay informed with curated coverage and the latest developments",
}: NewsFeedProps) {
  const [featuredArticles, setFeaturedArticles] = useState<
    FeaturedArticleType[]
  >([]);
  const [liveArticles, setLiveArticles] = useState<NewsArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchNews({
      raceFilter,
      candidateId,
      setFeaturedArticles,
      setLiveArticles,
      setLastUpdated,
      setLoading,
      setRefreshing,
    });
  }, [raceFilter, candidateId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchNews({
      raceFilter,
      candidateId,
      setFeaturedArticles,
      setLiveArticles,
      setLastUpdated,
      setLoading,
      setRefreshing,
    });
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="space-y-8">
        {/* Featured skeleton */}
        <div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest skeleton */}
        <div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div className="flex-1">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3 text-center sm:text-left">
            {sectionTitle}
          </h2>
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <p className="text-gray-600 text-lg">{sectionSubTitle}</p>
            {/* Refresh button - mobile (next to subtitle) */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 flex-shrink-0"
              aria-label="Refresh news"
            >
              <RefreshCw
                className={`w-5 h-5 text-gray-600 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>
        {/* Refresh button - desktop (aligned with title/subtitle) */}
        <div className="hidden sm:flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-gray-500 whitespace-nowrap">
              Last updated:{" "}
              {lastUpdated.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 flex-shrink-0"
            aria-label="Refresh news"
          >
            <RefreshCw
              className={`w-5 h-5 text-gray-600 ${
                refreshing ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <div>
          <div className="space-y-6">
            {featuredArticles.map((article) => (
              <FeaturedArticle article={article} />
            ))}
          </div>
        </div>
      )}

      {/* Latest News Section */}
      {showAllNews ? (
        <div>
          {/* Subtitle */}
          {featuredArticles.length > 0 && (
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Other Related News
            </h3>
          )}

          {/* Latest articles grid */}
          {liveArticles.length === 0 ? (
            <Card>
              <div className="text-center py-8 text-gray-500">
                <Newspaper className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No recent news articles found.</p>
                <p className="text-sm mt-1">
                  Try refreshing to check for updates.
                </p>
              </div>
            </Card>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {(limit > 0 ? liveArticles.slice(0, limit) : liveArticles).map(
                (article, index) => (
                  <LiveArticle
                    key={article.link}
                    article={article}
                    index={index}
                  />
                )
              )}
            </div>
          )}
        </div>
      ) : (
        /* Link to full news page */
        <div className="text-center sm:text-left">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-lg transition-colors"
          >
            View More News
            <MoveRight />
          </Link>
        </div>
      )}
    </div>
  );
}
