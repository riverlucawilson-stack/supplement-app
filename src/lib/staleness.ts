// Decides when a price, COA, or certification is too old to trust.
// The limits themselves live in src/settings.ts.
import { settings } from '../settings';
import { addMonths, daysBetween, isAfterDay } from './dates';

/** A price is stale when it was checked more than `priceStaleAfterDays` days ago. */
export function isPriceStale(dateChecked: Date, today: Date): boolean {
  return daysBetween(dateChecked, today) > settings.priceStaleAfterDays;
}

/** A COA is stale when its test date is more than `coaStaleAfterYears` years ago. */
export function isCoaStale(testDate: Date, today: Date): boolean {
  return isAfterDay(today, addMonths(testDate, settings.coaStaleAfterYears * 12));
}

/** A certification is current when you re-checked its listing within `certificationCurrentForMonths`. */
export function isCertificationCurrent(dateVerified: Date, today: Date): boolean {
  return !isAfterDay(today, addMonths(dateVerified, settings.certificationCurrentForMonths));
}

export type DatedKind = 'price' | 'coa' | 'certification';

/**
 * How old a dated item is compared with its limit: 0.5 is halfway to stale,
 * 1 is the last fresh day, above 1 is stale. Used to rank "the stalest items",
 * since a 20-day-old price and a 20-day-old COA aren't equally old news.
 */
export function freshness(kind: DatedKind, date: Date, today: Date): { ageDays: number; limitDays: number; used: number } {
  const limitDays =
    kind === 'price'
      ? settings.priceStaleAfterDays
      : daysBetween(date, addMonths(date, kind === 'coa' ? settings.coaStaleAfterYears * 12 : settings.certificationCurrentForMonths));
  const ageDays = daysBetween(date, today);
  return { ageDays, limitDays, used: ageDays / limitDays };
}
