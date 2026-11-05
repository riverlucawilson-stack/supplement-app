// Money as shown on the site. Costs under 10 cents (common for vitamins) get a
// third decimal so products that differ by fractions of a cent don't look tied.
export function usd(n: number): string {
  return `$${n.toFixed(n < 0.1 ? 3 : 2)}`;
}

// Lowercases a name's first letter for use mid-sentence ("Fish oil" → "fish oil"),
// but leaves names like "CoQ10" or "B12" alone: only a plain first word like "Fish" is lowercased.
export function midSentence(name: string): string {
  return /^[A-Z][a-z]+(\s|$)/.test(name) ? name.charAt(0).toLowerCase() + name.slice(1) : name;
}
