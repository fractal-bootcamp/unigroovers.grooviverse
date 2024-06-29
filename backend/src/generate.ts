import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai";
import { z, ZodRawShape } from "zod";
import readline from "readline";

const oai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? undefined,
});

const client = Instructor({
  client: oai,
  mode: "TOOLS",
});

export const promptWithSchema = async <T extends ZodRawShape>(
  prompt: string,
  schema: z.ZodObject<T>
) => {
  try {
    const response = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      response_model: {
        schema: schema,
        name: "User",
      },
    });
    return response;
  } catch (error) {
    console.error("Error generating prompt:", error);
  }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question: string) => {
  return new Promise((resolve) => rl.question(question, resolve));
};

export const UniverseSchema = z.object({
  name: z.string(),
  id: z.string(),
  age: z.number(),
  ageUnit: z.string(),
  dimensions: z.number().array(),
  dimensionsUnit: z.string(),

  //galaxy of this universe
  galaxy: z.object({
    name: z.string(),
    id: z.string(),
    age: z.number(),
    ageUnit: z.string(),
    dimensions: z.number().array(),
    dimensionsUnit: z.string(),

    solarsystem: z.object({
      name: z.string(),
      id: z.string(),
      age: z.number(),
      ageUnit: z.string(),
      dimensions: z.number().array(),
      dimensionsUnit: z.string(),

      //planet in this solar system
      planet: z.object({
        name: z.string(),
        id: z.string(),
        age: z.number(),
        ageUnit: z.string(),
        dimensions: z.array(z.number()),
        dimensionsUnit: z.string(),
      }),
    }),
  }),
});

export const GalaxySchema = z.object({});

export const generateUniverseDescription = async (prompt: string) => {
  try {
    const givenName = await askQuestion("Whats the name of your Universe? ");
    const givenInfo = await askQuestion(
      "Anthing you'd like us to know about your universe? "
    );

    const universeDescriptionSchema = z
      .object({
        universeDescriptionSequence: z
          .array(
            z
              .string()
              .describe(
                "A single line that describes some statistic of the universe like the age or dimensions"
              )
          )
          .describe(
            "The detailed sequence of description lines of the universe"
          ),
      })
      .describe(
        "A detailed overview of the universe description. It should be realistic and reflect the actual statistics, metrics, and history of a universe."
      );

    const universe = await promptWithSchema(prompt, UniverseSchema);

    if (universe) {
      const universeSequence = await promptWithSchema(
        `Describe each property of ${universe.name}.`,
        universeDescriptionSchema
      );

      console.log("  ");
      console.log("*********** DESCRIPTION *************");
      if (universeSequence && universeSequence.universeDescriptionSequence) {
        universeSequence.universeDescriptionSequence.forEach((action: any) => {
          console.log(action);
        });
      }

      return universe;
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
};

export const generateUniverse = async (prompt: string) => {
  try {
    const universe = await promptWithSchema(prompt, UniverseSchema);
    return universe;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
};

//`Generate a Universe with realistic metrics for a Universe for ${givenName} based on the ${givenInfo}. The age and dimensions of each element should realistic based on actual universe, galaxy, solary system, and planet metrics. This means the  universe should be much larger and older than the galaxy, galaxies should be larger and older than solar systems. Solar Systems should be larger and older than planets. Universes should be in parsecs, galaxies in light years, solar system in lightyears, planets in Kilometers.`,
