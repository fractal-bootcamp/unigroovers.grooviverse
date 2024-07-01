import express from "express";
import cors from "cors";
import { getUniverseController } from "../controllers/universe/controller";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://grooviverse.onrender.com"],

    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.get("/", (_req, res) => res.json({ message: "Groovy" }));
app.get("/universe", getUniverseController);

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}.`)
);
