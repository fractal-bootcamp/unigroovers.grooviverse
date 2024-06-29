import { z, ZodRawShape } from "zod";

export const UniverseSchema = z.object({
  name: z.string(),
  id: z.string(),
  starCount: z.number(),
  radius: z.number(),
});

export const GalaxySchema = z.object({
  name: z.string(),
  id: z.string(),
  starCount: z.number(),
  radius: z.number(),
});

export const SolarSystemSchema = z.object({
  name: z.string(),
  id: z.string(),
  planetCount: z.number(),
});

export const PlanetSchema = z.object({
  name: z.string(),
  id: z.string(),
});
