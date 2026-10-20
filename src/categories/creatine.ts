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
  // Prices are compared per this much of the active ingredient.
  referenceDose: { grams: 5, label: 'per 5 g creatine' },
  // Grams of the active ingredient per day, used for "cost per 30 days".
  dailyGrams: 5,
  // The validation script warns when a cost per 5 g falls outside this range,
  // since that usually means a typo in the price or servings.
  plausibleCostPerReferenceDose: { min: 0.05, max: 5 },
  // How many grams of the active ingredient one serving gives.
  activeGramsPerServing: (p: CreatineProduct) => p.dose.creatine_per_serving_g,
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
