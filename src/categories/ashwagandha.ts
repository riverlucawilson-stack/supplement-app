// Everything specific to ashwagandha: its extra product fields, its COA tests,
// and the amount the site compares prices on (600 mg of ashwagandha).
import { z } from 'astro/zod';
import { baseProductFields, coaSchema } from './shared';

export const ashwagandhaTypes = ['root_extract', 'root_leaf_extract', 'root_powder', 'other'] as const;

export const ashwagandhaCoaTests = [
  'withanolides',
  'identity',
  'lead',
  'arsenic',
  'cadmium',
  'mercury',
  'microbial',
  'pesticides',
  'residual_solvents',
  'aflatoxins',
] as const;

export const ashwagandhaProductSchema = z.strictObject({
  category: z.literal('ashwagandha'),
  ...baseProductFields,
  ashwagandha_type: z.enum(ashwagandhaTypes),
  // Branded extract named on the label, e.g. "KSM-66" or "Sensoril". Leave out if none.
  extract: z.string().optional(),
  dose: z.strictObject({
    // Capsules, tablets, gummies or scoops in one serving, as the label says.
    units_per_serving: z.number().int().positive(),
    // Milligrams of ashwagandha (extract or powder) in one serving.
    ashwagandha_per_serving_mg: z.number().positive(),
    // Only if the label states it, e.g. 5 for "standardized to 5% withanolides".
    withanolides_percent: z.number().positive().max(100).optional(),
    servings_per_container: z.number().int().positive(),
  }),
  coas: z.array(coaSchema(ashwagandhaCoaTests)).default([]),
});

export type AshwagandhaProduct = z.infer<typeof ashwagandhaProductSchema>;

export const ashwagandha = {
  id: 'ashwagandha',
  name: 'Ashwagandha',
  path: '/ashwagandha/',
  evidencePath: '/ashwagandha/evidence/',
  // Prices are compared per this much of the active ingredient (as labeled,
  // extract or powder). Change both numbers together to compare on another amount.
  referenceDose: { grams: 0.6, label: 'per 600 mg ashwagandha', short: 'Cost per 600 mg' },
  // Grams per day used for "cost per 30 days".
  dailyGrams: 0.6,
  dailyLabel: '30 days at 600 mg/day',
  plausibleCostPerReferenceDose: { min: 0.02, max: 3 },
  activeGramsPerServing: (p: AshwagandhaProduct) => p.dose.ashwagandha_per_serving_mg / 1000,
  // The short description under the product name in the table.
  describe: (p: AshwagandhaProduct) =>
    [ashwagandha.typeLabels[p.ashwagandha_type], p.extract, p.dose.withanolides_percent && `${p.dose.withanolides_percent}% withanolides`]
      .filter(Boolean)
      .join(' · '),
  // Values that can't be true. The validation script reports these as errors.
  impossibleValues: (p: AshwagandhaProduct): string[] =>
    p.dose.ashwagandha_per_serving_mg > 10000
      ? [`dose: ${p.dose.ashwagandha_per_serving_mg} mg per serving is over 10 g. Check the units (mg, not g).`]
      : [],
  coaTestLabels: {
    withanolides: 'Withanolides (potency)',
    identity: 'Identity (species and plant part)',
    lead: 'Lead',
    arsenic: 'Arsenic',
    cadmium: 'Cadmium',
    mercury: 'Mercury',
    microbial: 'Microbial',
    pesticides: 'Pesticides',
    residual_solvents: 'Residual solvents',
    aflatoxins: 'Aflatoxins',
  } satisfies Record<(typeof ashwagandhaCoaTests)[number], string>,
  typeLabels: {
    root_extract: 'Root extract',
    root_leaf_extract: 'Root + leaf extract',
    root_powder: 'Root powder',
    other: 'Other',
  } satisfies Record<(typeof ashwagandhaTypes)[number], string>,
};
