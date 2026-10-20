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
