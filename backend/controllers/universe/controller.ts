import { Request, Response } from "express";
import { promptWithSchema } from "../../src/generate";
import { GalaxySchema, HouseSchema, PlanetSchema, SolarSystemSchema, UniverseSchema } from "../../src/schemas";
import { PromptFnArgs, galaxyPrompt, housePrompt, planetPrompt, solarSystemPrompt, universePrompt } from "../../src/prompt";
import { UniverseOutputDto } from "./types";

export async function getUniverseController(req: Request, res: Response): Promise<void> {
  const universePromptArgs: PromptFnArgs = {ageMin: 1, ageMax: 10000, sizeMin: 100000, sizeMax: 10000000};
  const universe = await promptWithSchema(universePrompt(universePromptArgs), UniverseSchema);
  if (universe === undefined) {
    res.json({message: "There was an error generating a universe."});
    return;
  }

  const galaxyPromptArgs: PromptFnArgs = {ageMin: 1, ageMax: universe.age / 2, sizeMin: universe.dimensions[0] / 1000, sizeMax: universe.dimensions[0] / 1000};
  const galaxy = await promptWithSchema(galaxyPrompt(galaxyPromptArgs), GalaxySchema);
  if (galaxy === undefined) {
    res.json({message: "There was an error generating a galaxy."});
    return;
  }

  const solarSystemPromptArgs: PromptFnArgs = {ageMin: 1, ageMax: galaxy.age / 2, sizeMin: galaxy.dimensions[0] / 1000, sizeMax: galaxy.dimensions[0] / 1000};
  const solarSystem = await promptWithSchema(solarSystemPrompt(solarSystemPromptArgs), SolarSystemSchema);
  if (solarSystem === undefined) {
    res.json({message: "There was an error generating a galaxy."});
    return;
  }

  const planetPromptArgs: PromptFnArgs = {ageMin: 1, ageMax: 100, sizeMin: 1000, sizeMax: 100000};
  const planet = await promptWithSchema(planetPrompt(planetPromptArgs), PlanetSchema);
  if (planet === undefined) {
    res.json({message: "There was an error generating a galaxy."});
    return;
  }

  const housePromptArgs: PromptFnArgs = {ageMin: 1, ageMax: 5000, sizeMin: 100, sizeMax: 100000};
  const house = await promptWithSchema(housePrompt(housePromptArgs), HouseSchema);
  if (house === undefined) {
    res.json({message: "There was an error generating a galaxy."});
    return;
  }

  // Create single nested object; in the future, these would be stored in a DB and associated via id or smth.
  const output: UniverseOutputDto = {
    ...universe,
    galaxy: {
      ...galaxy,
      solarSystem: {
        ...solarSystem,
        planet: {
          ...planet,
          house: {
            ...house
          }
        }
      }
    }
  }
  res.json(output);

}