// Everything specific to creatine: its extra product fields, its COA tests,
// and the dose the site compares prices on (5 g of creatine).
import { z } from 'astro/zod';
import { baseProductFields, coaSchema } from './shared';

export const creatineTypes = [
  'monohydrate',
  'hcl',
  'nitrate',
  'ethyl_ester',
  'buffered',
  'magnesium_chelate',
  'other',
] as const;

export const creatineCoaTests = [
  'purity',
  'lead',
  'arsenic',
  'cadmium',
  'mercury',
  'microbial',
  'creatinine',
  'dcd',
  'dht',
] as const;

export const creatineProductSchema = z.strictObject({
  category: z.literal('creatine'),
  ...baseProductFields,
  creatine_type: z.enum(creatineTypes),
  // e.g. "Creapure". Leave out of the file if the label doesn't say.
  raw_material: z.string().optional(),
  dose: z.strictObject({
    serving_size_g: z.number().positive(),
    creatine_per_serving_g: z.number().positive(),
    servings_per_container: z.number().int().positive(),
  }),
  coas: z.array(coaSchema(creatineCoaTests)).default([]),
});

export type CreatineProduct = z.infer<typeof creatineProductSchema>;

export const creatine = {
  id: 'creatine',
  name: 'Creatine',
  path: '/',
  evidencePath: '/creatine/evidence/',
  productBase: '/creatine/',
  // Prices are compared per this much of the active ingredient.
  referenceDose: { grams: 5, label: 'per 5 g creatine', short: 'Cost per 5 g' },
  // Grams of the active ingredient per day, used for "cost per 30 days".
  dailyGrams: 5,
  dailyLabel: '30 days at 5 g/day',
  // The validation script warns when a cost per 5 g falls outside this range,
  // since that usually means a typo in the price or servings.
  plausibleCostPerReferenceDose: { min: 0.05, max: 5 },
  // How many grams of the active ingredient one serving gives.
  activeGramsPerServing: (p: CreatineProduct) => p.dose.creatine_per_serving_g,
  // The short description under the product name in the table.
  describe: (p: CreatineProduct) =>
    [creatine.typeLabels[p.creatine_type], p.raw_material].filter(Boolean).join(' · '),
  // The label facts shown in the "Dose" box on each product page.
  doseFacts: (p: CreatineProduct) => [
    { label: 'Serving size', value: `${p.dose.serving_size_g} g` },
    { label: 'Creatine per serving', value: `${p.dose.creatine_per_serving_g} g` },
    { label: 'Servings per container (label)', value: `${p.dose.servings_per_container}` },
  ],
  // Values that can't be true. The validation script reports these as errors.
  impossibleValues: (p: CreatineProduct): string[] =>
    p.dose.creatine_per_serving_g > p.dose.serving_size_g
      ? [`dose: creatine per serving (${p.dose.creatine_per_serving_g} g) is more than the whole serving (${p.dose.serving_size_g} g).`]
      : [],
  coaTestLabels: {
    purity: 'Purity / potency',
    lead: 'Lead',
    arsenic: 'Arsenic',
    cadmium: 'Cadmium',
    mercury: 'Mercury',
    microbial: 'Microbial',
    creatinine: 'Creatinine',
    dcd: 'Dicyandiamide (DCD)',
    dht: 'Dihydrotriazine (DHT)',
  } satisfies Record<(typeof creatineCoaTests)[number], string>,
  typeLabels: {
    monohydrate: 'Monohydrate',
    hcl: 'HCl',
    nitrate: 'Nitrate',
    ethyl_ester: 'Ethyl ester',
    buffered: 'Buffered',
    magnesium_chelate: 'Magnesium chelate',
    other: 'Other',
  } satisfies Record<(typeof creatineTypes)[number], string>,
};
