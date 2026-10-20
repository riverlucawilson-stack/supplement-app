// All the price math. Nothing on the site is typed in by hand:
// every cost below is calculated from the product file.
import { categories } from '../categories';
import type { Product } from '../categories';
import { isPriceStale } from './staleness';

type Price = Product['prices'][number];

export interface PriceMath {
  price: Price;
  /** Grams of the active ingredient (creatine) in this retailer's container. */
  activeGrams: number;
  /** e.g. cost per 5 g of creatine. */
  costPerReferenceDose: number;
  /** Cost of 30 days at the category's daily dose (5 g/day for creatine). */
  costPer30Days: number;
  stale: boolean;
}

function categoryOf(product: Product) {
  return categories[product.category];
}

/** Works out the per-dose costs for one retailer's price. */
export function priceMath(product: Product, price: Price, today: Date): PriceMath {
  const category = categoryOf(product);
  const activeGrams = price.servings * category.activeGramsPerServing(product);
  const costPerGram = price.price_usd / activeGrams;
  return {
    price,
    activeGrams,
    costPerReferenceDose: costPerGram * category.referenceDose.grams,
    costPer30Days: costPerGram * category.dailyGrams * 30,
    stale: isPriceStale(price.date_checked, today),
  };
}

/** Every retailer's price for a product, cheapest per dose first. */
export function allPrices(product: Product, today: Date): PriceMath[] {
  return product.prices
    .map((price) => priceMath(product, price, today))
    .sort((a, b) => a.costPerReferenceDose - b.costPerReferenceDose);
}

/**
 * The best price: the lowest cost per dose among prices that aren't stale.
 * If every price is stale, the lowest stale one is used (and marked stale).
 * Returns undefined when the product has no prices at all.
 */
export function bestPrice(product: Product, today: Date): PriceMath | undefined {
  const prices = allPrices(product, today);
  return prices.find((p) => !p.stale) ?? prices[0];
}
