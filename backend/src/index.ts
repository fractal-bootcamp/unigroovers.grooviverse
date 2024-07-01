import express from "express";
import cors from "cors";
import { getUniverseController } from "../controllers/universe/controller";

const app = express();
const PORT = 3000;

const prompt: string =
  "Generate a universe with following properties: name, age, and size. The name will start with a random letter. The name need not be easy to pronounce. You are strongly encouraged to use non-English characters, but be sure the name is readable to English speakers. The name should not contain any substrings (length 4 or greater) that are valid English words. The age of the universe should be a totally random number between 1 and 10,000 with up to 2 decimal places on the scale of billions of billions of years. Specifically some random number of billions of billions - do not use any other unit. The size of the universe should be a totally random number between 100,000 and 10,000,000. It may have up to 2 decimal places, and must have the unit parsecs. Please also provide a description of the universe. Be sure to include some information on the history of the universe, suggesting at a larger storyline. Do not make it sound like a realistic documentary.";

app.use(
  cors({
    origin: ["http://localhost:5173", "https://grooviverse.onrender.com"],

    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Groovy" }));
app.get("/universe", getUniverseController);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
