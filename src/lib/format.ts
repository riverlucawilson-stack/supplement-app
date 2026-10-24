// Money as shown on the site. Costs under 10 cents (common for vitamins) get a
// third decimal so products that differ by fractions of a cent don't look tied.
export function usd(n: number): string {
  return `$${n.toFixed(n < 0.1 ? 3 : 2)}`;
}
