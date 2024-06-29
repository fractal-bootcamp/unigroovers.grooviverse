import { CompletionMeta } from "@instructor-ai/instructor";

type UniverseEntity = {
  name: string;
  id: string;
  age: number;
  ageUnit: string;
  dimensions: number[];
  dimensionsUnit: string;
  _meta?: CompletionMeta;
}

export type UniverseOutputDto = UniverseEntity & {
  galaxy: UniverseEntity & {
    solarSystem: UniverseEntity & {
      planet: UniverseEntity & {
        house: UniverseEntity
      }
    }
  }
}