// The transparency tier (A, B or C) and the reasons behind it.
// Tier rules, in plain words:
//   A: a current third-party certification AND a COA from an ISO/IEC 17025
//      accredited lab, on the finished product, that isn't stale.
//   B: not A, but there is at least one COA or certification.
//   C: no COA and no certification found.
// The tier is shown next to the price and never mixed into one score.
import type { Product } from '../categories';
import { settings } from '../settings';
import { isCertificationCurrent, isCoaStale } from './staleness';

export type Tier = 'A' | 'B' | 'C';

export interface TierCheck {
  label: string;
  met: boolean;
  /** Plain-English explanation shown on the product page. */
  details: string[];
}

export interface TierResult {
  tier: Tier;
  checks: TierCheck[];
}

type Coa = Product['coas'][number];

function day(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** What stops one COA from counting toward Tier A (empty list = nothing). */
export function coaProblems(coa: Coa, today: Date): string[] {
  const problems: string[] = [];
  if (coa.iso_17025 === 'no') problems.push('lab is not ISO/IEC 17025 accredited');
  if (coa.iso_17025 === 'unknown') problems.push("lab's ISO/IEC 17025 accreditation is unconfirmed");
  if (coa.scope === 'raw_material') problems.push('tests the raw material, not the finished product');
  if (isCoaStale(coa.test_date, today)) {
    problems.push(`test date ${day(coa.test_date)} is more than ${settings.coaStaleAfterYears} years old`);
  }
  return problems;
}

export function tierFor(product: Product, today: Date): TierResult {
  // Check 1: certification
  const currentCerts = product.certifications.filter((c) => isCertificationCurrent(c.date_verified, today));
  const certCheck: TierCheck = {
    label: 'Current third-party certification',
    met: currentCerts.length > 0,
    details:
      product.certifications.length === 0
        ? ['No certification found.']
        : product.certifications.map((c) =>
            isCertificationCurrent(c.date_verified, today)
              ? `${c.program}: listing verified ${day(c.date_verified)}.`
              : `${c.program}: listing last verified ${day(c.date_verified)}, more than ${settings.certificationCurrentForMonths} months ago.`,
          ),
  };

  // Check 2: a qualifying COA
  const qualifyingCoas = product.coas.filter((coa) => coaProblems(coa, today).length === 0);
  const coaCheck: TierCheck = {
    label: `COA from an accredited lab, on the finished product, under ${settings.coaStaleAfterYears} years old`,
    met: qualifyingCoas.length > 0,
    details:
      product.coas.length === 0
        ? ['No COA found.']
        : product.coas.map((coa) => {
            const problems = coaProblems(coa, today);
            const name = `Lot ${coa.lot} (${coa.lab}, tested ${day(coa.test_date)})`;
            return problems.length === 0 ? `${name}: meets every requirement.` : `${name}: ${problems.join('; ')}.`;
          }),
  };

  const checks = [certCheck, coaCheck];
  let tier: Tier;
  if (certCheck.met && coaCheck.met) tier = 'A';
  else if (product.coas.length > 0 || product.certifications.length > 0) tier = 'B';
  else tier = 'C';
  return { tier, checks };
}
