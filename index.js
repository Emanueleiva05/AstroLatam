import express from "express";
import env from "dotenv";

env.config();

const app = express();
const PORT = process.env.PORT;

app.json;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});
