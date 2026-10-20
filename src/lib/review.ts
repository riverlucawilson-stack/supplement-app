// Helpers that tell the page (and you) which data still needs a human check.
import type { Product } from '../categories';

/** True for the fake sample products, which use example.com links. */
export function isSampleProduct(product: Product): boolean {
  const urls = [
    ...product.prices.map((p) => p.url),
    ...product.certifications.map((c) => c.listing_url),
    ...product.coas.map((c) => c.url),
  ];
  return urls.some((u) => new URL(u).hostname.endsWith('example.com'));
}

/** True when any part of the product was entered by Claude and not yet checked. */
export function hasUnverifiedData(product: Product): boolean {
  return Boolean(
    product.entered_by ||
      product.prices.some((p) => p.entered_by) ||
      product.certifications.some((c) => c.entered_by) ||
      product.coas.some((c) => c.entered_by),
  );
}
