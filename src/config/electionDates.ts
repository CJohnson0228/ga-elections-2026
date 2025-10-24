/**
 * Election Dates Configuration
 * Central location for all election-related dates
 */

export const ELECTION_DATES = {
  PRIMARY: {
    date: new Date("2026-05-19T07:00:00"),
    label: "May 19, 2026",
    pollsOpenTime: "7:00 AM",
  },
  GENERAL: {
    date: new Date("2026-11-03T07:00:00"),
    label: "November 3, 2026",
    pollsOpenTime: "7:00 AM",
  },
  VOTER_REGISTRATION_DEADLINE: {
    date: new Date("2026-10-06T23:59:59"),
    label: "October 6, 2026",
  },
  EARLY_VOTING_START: {
    date: new Date("2026-10-12T07:00:00"),
    label: "October 12, 2026",
  },
  EARLY_VOTING_END: {
    date: new Date("2026-10-30T19:00:00"),
    label: "October 30, 2026",
  },
} as const;

/**
 * Format election date for display
 */
export function formatElectionDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Check if a date has passed
 */
export function hasDatePassed(date: Date): boolean {
  return new Date() > date;
}
