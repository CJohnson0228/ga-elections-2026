import type { FeaturedArticleType } from "../../../types";
import {
  getCategoryLabel,
  getCategoryColor,
  getRelativeTime,
} from "../utils/newsUtils";
import { ExternalLink } from "lucide-react";
import Card from "../../../components/ui/Card";

interface FeaturedArticleProps {
  article: FeaturedArticleType;
}

function FeaturedArticle(props: FeaturedArticleProps) {
  const article = props.article;
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full h-full cursor-pointer"
    >
      <Card
        padding="none"
        className="hover:shadow-xl transition-all duration-300 border-2 border-primary-100 relative overflow-hidden flex"
      >
        {/* Vertical Featured Bar */}
        <div className="w-8 bg-primary-600 flex-shrink-0 flex items-center justify-center">
          <span
            className="text-white text-xs font-bold uppercase tracking-wider"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Featured
          </span>
        </div>

        <div className="p-6 flex-1 rounded-r-xl">
          {/* Category badge */}
          <div className="mb-3">
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(
                article.category
              )}`}
            >
              {getCategoryLabel(article.category)}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-display font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors flex items-start gap-2">
            <span className="flex-1">{article.title}</span>
            <ExternalLink className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>

          {/* Description */}
          <p className="text-gray-700 mb-3 line-clamp-3">
            {article.description}
          </p>

          {/* Relevance */}
          <div className="bg-primary-50 border-l-4 border-primary-600 p-3 mb-4">
            <p className="text-sm text-primary-900 font-medium">
              {article.relevance}
            </p>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-medium">{article.source}</span>
            <span>{getRelativeTime(article.pubDate)}</span>
          </div>
        </div>
      </Card>
    </a>
  );
}

export default FeaturedArticle;
