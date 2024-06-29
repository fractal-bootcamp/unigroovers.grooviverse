import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => res.json({message: 'Groovy'}));

app.listen(PORT, () => `Server listening on port ${PORT}.`);

