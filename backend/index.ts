import express from "express";
import { main } from "./generate";

const app = express();
const PORT = 3000;

app.use(express.json());

main();

app.get("/", (req, res) => res.json({ message: "Groovy" }));

app.listen(PORT, () => `Server listening on port ${PORT}.`);
