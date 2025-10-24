/**
 * RSS Feed Item Types
 * Types for raw RSS feed data from the Netlify function
 */

export interface RSSItemType {
  title: string;
  link: string;
  pubDate: string;
  source?: string;
  author?: string;
  description?: string;
}

export interface RSSFunctionResponseType {
  status: "ok" | "error";
  items: RSSItemType[];
  message?: string;
}
