import type { NewsArticleType } from "../../../types";
import { ExternalLink, Newspaper, Clock } from "lucide-react";
import { getRelativeTime } from "../utils/newsUtils";

interface NewsArticleProps {
  article: NewsArticleType;
  index: number;
}

function LiveArticle(props: NewsArticleProps) {
  const article = props.article;
  const index = props.index;

  return (
    <a
      key={`${article.link}-${index}`}
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full py-4 px-4 border-b border-gray-200 hover:bg-gray-50/50 transition-all duration-200 relative"
    >
      {/* Blue bar on left - shows on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top"></div>

      {/* Top Row: Icon + Source (left) and Time (right) */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-primary-600 flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700">
            {article.source}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-sm">
            {getRelativeTime(article.pubDate)}
          </span>
        </div>
      </div>

      {/* Middle Row: Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors leading-tight">
        {article.title}
      </h3>

      {/* Bottom Row: Description + Read Icon */}
      <div className="flex items-start justify-between gap-4">
        {article.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed flex-1">
            {article.description}
          </p>
        )}
        <ExternalLink className="w-5 h-5 text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0 mt-0.5" />
      </div>
    </a>
  );
}

export default LiveArticle;
