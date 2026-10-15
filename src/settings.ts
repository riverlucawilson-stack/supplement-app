// Site-wide settings. Change values here, not in the page code.

export const settings = {
  // Shown in page titles and the header. Pick a real name later.
  siteName: '[SITE NAME]',

  // The site's public address. Update after deploying (phase f).
  siteUrl: 'https://example.pages.dev',

  // A price is marked "stale" when its date_checked is older than this.
  priceStaleAfterDays: 14,

  // A COA is marked "stale" when its test_date is older than this.
  coaStaleAfterYears: 2,

  // A certification counts as "current" only if you re-checked the
  // certifier's listing within this many months (date_verified).
  certificationCurrentForMonths: 12,
} as const;
