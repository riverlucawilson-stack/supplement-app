// Builds a fake product for tests. Pass only the fields a test cares about.
import { productSchema } from '../src/categories';
import type { Product } from '../src/categories';

export const TODAY = new Date('2026-10-20');

export function makeProduct(overrides: Record<string, unknown> = {}): Product {
  return productSchema.parse({
    category: 'creatine',
    brand: 'Test Brand',
    name: 'Test Product',
    form: 'powder',
    creatine_type: 'monohydrate',
    dose: { serving_size_g: 5, creatine_per_serving_g: 5, servings_per_container: 100 },
    ...overrides,
  });
}

export function price(price_usd: number, servings: number, date_checked = '2026-10-19', retailer = 'Store') {
  return { retailer, price_usd, servings, url: 'https://example.com/p', date_checked };
}

export function coa(overrides: Record<string, unknown> = {}) {
  return {
    url: 'https://example.com/coa.pdf',
    lab: 'Test Lab',
    iso_17025: 'yes',
    lot: 'L1',
    test_date: '2026-01-01',
    scope: 'finished_product',
    tests: ['purity'],
    ...overrides,
  };
}

export function cert(date_verified = '2026-06-01') {
  return { program: 'NSF Certified for Sport', listing_url: 'https://example.com/cert', date_verified };
}
