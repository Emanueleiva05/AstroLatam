import express, { json } from "express";
import env from "dotenv";
import sequelize from "./src/settings/conexion.js";
import "./src/models/index.js";

env.config();

const app = express();
const PORT = process.env.PORT;

app.use(json());

await sequelize.sync({ alter: true });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});
