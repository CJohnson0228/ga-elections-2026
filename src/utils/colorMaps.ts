/**
 * Color and Label Mapping Utilities
 * Centralized color schemes and labels for consistent UI
 */

/**
 * Get party-specific Tailwind color classes
 * @param party - Party name or abbreviation (e.g., "Democrat", "Republican", "Independent")
 * @returns Tailwind CSS classes for background, text, and border colors
 */
export function getPartyColor(party: string): string {
  const lowerParty = party.toLowerCase();

  if (lowerParty.includes("democrat")) {
    return "bg-blue-100 text-blue-700 border-blue-300";
  }
  if (lowerParty.includes("republican")) {
    return "bg-red-100 text-red-700 border-red-300";
  }
  if (lowerParty.includes("independent")) {
    return "bg-purple-100 text-purple-700 border-purple-300";
  }

  return "bg-gray-100 text-gray-700 border-gray-300";
}

/**
 * Get category-specific Tailwind color classes for news articles and UI elements
 * @param category - Category identifier (e.g., "governor", "state-senate", "us-senate")
 * @returns Tailwind CSS classes for background and text colors
 */
export function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    governor: "bg-primary-100 text-primary-700",
    "lt-governor": "bg-success-500/20 text-success-600",
    "state-senate": "bg-caution-400/20 text-caution-600",
    "state-house": "bg-note-400/20 text-note-600",
    "us-senate": "bg-warning-500/20 text-warning-600",
    all: "bg-gray-100 text-gray-700",
  };

  return colorMap[category] || "bg-gray-100 text-gray-700";
}

/**
 * Get human-readable category label
 * @param category - Category identifier (e.g., "governor", "state-senate")
 * @returns Formatted category name for display (e.g., "Governor", "State Senate")
 */
export function getCategoryLabel(category: string): string {
  const labelMap: Record<string, string> = {
    governor: "Governor",
    "lt-governor": "Lt. Governor",
    "state-senate": "State Senate",
    "state-house": "State House",
    "us-senate": "U.S. Senate",
    all: "General",
  };

  return labelMap[category] || category;
}
