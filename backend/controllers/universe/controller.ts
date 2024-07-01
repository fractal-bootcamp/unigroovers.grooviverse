import { Request, Response } from "express";
import { promptWithSchema } from "../../src/generate";
import {
  GalaxySchema,
  SolarSystemSchema,
  UniverseSchema,
} from "../../src/schemas";
import {
  PromptFnArgs,
  galaxyPrompt,
  solarSystemPrompt,
  universePrompt,
} from "../../src/prompt";
import { UniverseOutputDto } from "./types";

export async function getUniverseController(
  _req: Request,
  res: Response
): Promise<void> {
  const density = 750; // 750 stars per 1 radius

  const universeRadius = 150;
  const universeStars = universeRadius * density;
  const universePromptArgs: PromptFnArgs = {
    radiusMin: universeRadius * 0.95,
    radiusMax: universeRadius * 1.05,
    bodiesMin: universeStars * 0.95,
    bodiesMax: universeStars * 1.05,
  };
  const universe = await promptWithSchema(
    universePrompt(universePromptArgs),
    UniverseSchema
  );
  if (universe === undefined) {
    res.json({ message: "There was an error generating a universe." });
    return;
  }

  const galaxyRadius = universe.radius / 15;
  const galaxyStars = galaxyRadius * density;
  const galaxyPromptArgs: PromptFnArgs = {
    radiusMin: galaxyRadius * 0.95,
    radiusMax: galaxyRadius * 1.05,
    bodiesMin: galaxyStars * 0.95,
    bodiesMax: galaxyStars * 1.05,
  };
  const galaxy = await promptWithSchema(
    galaxyPrompt(galaxyPromptArgs),
    GalaxySchema
  );
  if (galaxy === undefined) {
    res.json({ message: "There was an error generating a galaxy." });
    return;
  }

  const solarSystemRadius = galaxy.radius / 15;
  const solarSystemPromptArgs: PromptFnArgs = {
    radiusMin: solarSystemRadius * 0.95,
    radiusMax: solarSystemRadius * 1.05,
    bodiesMin: 5,
    bodiesMax: 12,
  };
  const solarSystem = await promptWithSchema(
    solarSystemPrompt(solarSystemPromptArgs),
    SolarSystemSchema
  );
  if (solarSystem === undefined) {
    res.json({ message: "There was an error generating a solar system." });
    return;
  }

  // Create single nested object; in the future, these would be stored in a DB and associated via id or smth.
  const output: UniverseOutputDto = {
    ...universe,
    galaxy: {
      ...galaxy,
      solarSystem: {
        ...solarSystem,
      },
    },
  };
  res.json(output);
}
