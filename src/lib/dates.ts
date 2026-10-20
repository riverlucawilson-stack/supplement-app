// Small date helpers. Every function takes "today" as an input so the
// tests can pretend it's any day they like.

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Whole days from `earlier` to `later` (negative if `earlier` is in the future). */
export function daysBetween(earlier: Date, later: Date): number {
  return Math.floor((startOfDayUtc(later) - startOfDayUtc(earlier)) / MS_PER_DAY);
}

/** The same calendar date `months` later, e.g. 2026-01-31 + 1 month = 2026-02-28. */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));
  const lastDay = new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate();
  result.setUTCDate(Math.min(date.getUTCDate(), lastDay));
  return result;
}

export function isAfterDay(a: Date, b: Date): boolean {
  return startOfDayUtc(a) > startOfDayUtc(b);
}

/** Dates are written without a time (2026-10-14), so compare whole days in UTC. */
function startOfDayUtc(d: Date): number {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}
