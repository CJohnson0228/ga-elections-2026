/**
 * API Configuration
 * Central location for all API endpoints and base URLs
 */

export const API_CONFIG = {
  /** GitHub raw content base URL for election data repository */
  GITHUB_DATA_BASE:
    "https://raw.githubusercontent.com/CJohnson0228/georgia-2026-election-data/main",

  /** Netlify Functions base URL (relative path) */
  NETLIFY_FUNCTIONS_BASE: "/.netlify/functions",

  /** OpenFEC API base URL */
  OPENFEC_BASE: "https://api.open.fec.gov/v1",
} as const;

/**
 * Get full URL for a GitHub data resource
 */
export function getGitHubDataUrl(path: string): string {
  return `${API_CONFIG.GITHUB_DATA_BASE}/${path}`;
}

/**
 * Get full URL for a Netlify function
 */
export function getNetlifyFunctionUrl(functionName: string): string {
  return `${API_CONFIG.NETLIFY_FUNCTIONS_BASE}/${functionName}`;
}

/**
 * Get full URL for an OpenFEC endpoint
 */
export function getOpenFECUrl(endpoint: string): string {
  return `${API_CONFIG.OPENFEC_BASE}/${endpoint}`;
}
