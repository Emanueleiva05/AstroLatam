import env from "dotenv";
import app from "./index.js";
import sequelize from "./src/settings/conexion.js";
import clientRedis from "./src/settings/redis.js";
import { swaggerDocs } from "./src/settings/swagger.js";

env.config();

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a MySQL");

    await clientRedis.connect();
    console.log("Conectado a Redis");

    swaggerDocs(app, PORT);

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en ${PORT}`);
    });
  } catch (err) {
    console.error("Error al iniciar servidor:", err);
  }
}

start();
