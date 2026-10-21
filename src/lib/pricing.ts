// All the price math. Nothing on the site is typed in by hand:
// every cost below is calculated from the product file.
import { categoryOf } from '../categories';
import type { Product } from '../categories';
import { isPriceStale } from './staleness';

type Price = Product['prices'][number];

export interface PriceMath {
  price: Price;
  /** Amount of the compared ingredient (e.g. grams of creatine) in this retailer's container, in the comparison's unit. */
  activeAmount: number;
  /** e.g. cost per 5 g of creatine. */
  costPerReferenceDose: number;
  /** Cost of 30 days at the category's daily amount (5 g/day for creatine). Undefined if the category sets none. */
  costPer30Days: number | undefined;
  stale: boolean;
}

/** Works out the per-dose costs for one retailer's price. */
export function priceMath(product: Product, price: Price, today: Date): PriceMath {
  const category = categoryOf(product);
  const activeAmount = price.servings * category.activePerServing(product);
  const costPerUnit = price.price_usd / activeAmount;
  return {
    price,
    activeAmount,
    costPerReferenceDose: costPerUnit * category.referenceDose.amount,
    costPer30Days: category.daily ? costPerUnit * category.daily.amount * 30 : undefined,
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
