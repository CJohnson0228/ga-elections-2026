import type { NewsArticleType } from "../../../types";
import { ExternalLink, Newspaper } from "lucide-react";
import { getRelativeTime } from "../utils/newsUtils";
import Card from "../../../components/ui/Card";

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
      className="group w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
    >
      <Card className="h-full hover:shadow-xl hover:border-primary-200 transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50">
        {/* Accent gradient bar on hover */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

        <div className="p-5">
          {/* Source badge with icon */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-br from-primary-100 to-primary-200 rounded-md flex items-center justify-center flex-shrink-0">
              <Newspaper className="w-3.5 h-3.5 text-primary-700" />
            </div>
            <span className="text-xs font-semibold text-gray-600 truncate">
              {article.source}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-3 leading-snug">
            {article.title}
          </h3>

          {/* Description */}
          {article.description && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {article.description}
            </p>
          )}

          {/* Meta footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {getRelativeTime(article.pubDate)}
            </span>
            <ExternalLink className="w-4 h-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Card>
    </a>
  );
}

export default LiveArticle;
