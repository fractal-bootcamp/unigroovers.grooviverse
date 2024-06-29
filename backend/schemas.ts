import { z, ZodRawShape } from "zod";

export const UniverseSchema = z.object({
  name: z.string(),
  id: z.string(),
  age: z.number(),
  ageUnit: z.string(),
  dimensions: z.number().array(),
  dimensionsUnit: z.string(),
});

export const GalaxySchema = z.object({
  name: z.string(),
  id: z.string(),
  age: z.number(),
  ageUnit: z.string(),
  dimensions: z.number().array(),
  dimensionsUnit: z.string(),
});

export const SolarSystemSchema = z.object({
  name: z.string(),
  id: z.string(),
  age: z.number(),
  ageUnit: z.string(),
  dimensions: z.number().array(),
  dimensionsUnit: z.string(),
});

export const PlanetSchema = z.object({
  name: z.string(),
  id: z.string(),
  age: z.number(),
  ageUnit: z.string(),
  dimensions: z.number().array(),
  dimensionsUnit: z.string(),
});

export const HouseSchema = z.object({
  name: z.string(),
  id: z.string(),
  age: z.number(),
  ageUnit: z.string(),
  dimensions: z.number().array(),
  dimensionsUnit: z.string(),
});
