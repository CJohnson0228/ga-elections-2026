import type { RaceData } from "./races";

/**
 * Filter races by a specific raceFilter value
 */
export function filterByRaceFilter(
  races: RaceData[],
  filter: string
): RaceData[] {
  if (filter === "all") return races;
  return races.filter((race) => race.raceFilter === filter);
}

/**
 * Filter races that have ANY of the provided tags
 */
export function filterByTags(races: RaceData[], tags: string[]): RaceData[] {
  if (tags.length === 0 || tags.includes("all")) return races;
  return races.filter((race) =>
    race.raceTags.some((tag) => tags.includes(tag))
  );
}

/**
 * Filter races that have ALL of the provided tags
 */
export function filterByAllTags(
  races: RaceData[],
  tags: string[]
): RaceData[] {
  if (tags.length === 0) return races;
  return races.filter((race) => tags.every((tag) => race.raceTags.includes(tag)));
}

/**
 * Get all unique tags from a collection of races
 */
export function getAllTags(races: RaceData[]): string[] {
  const tagSet = new Set<string>();
  races.forEach((race) => {
    race.raceTags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Check if a race matches a filter (can be string or array of tags)
 */
export function matchesFilter(
  race: RaceData,
  filter: string | string[]
): boolean {
  if (filter === "all") return true;

  if (typeof filter === "string") {
    return race.raceFilter === filter;
  }

  if (Array.isArray(filter)) {
    return race.raceTags.some((tag) => filter.includes(tag));
  }

  return false;
}

/**
 * Get races by external ID type (for API integrations)
 */
export function getRacesByExternalIdType(
  races: RaceData[],
  idType: "openFEC" | "transparencyUSA" | "ballotpedia"
): RaceData[] {
  return races.filter(
    (race) => race.externalIds && race.externalIds[idType] !== undefined
  );
}

/**
 * Find a race by its external ID
 */
export function findRaceByExternalId(
  races: RaceData[],
  idType: "openFEC" | "transparencyUSA" | "ballotpedia",
  externalId: string
): RaceData | undefined {
  return races.find(
    (race) =>
      race.externalIds && race.externalIds[idType] === externalId
  );
}
