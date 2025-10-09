import express, { json } from "express";
import env from "dotenv";
import sequelize from "./src/settings/conexion.js";
import "./src/models/index.js";
import TipoAdjuntoRouter from "./src/routes/TipoAdjuntoRouter.js";
import TipoPublicacionRouter from "./src/routes/TipoPublicacionRouter.js";
import TipoCondicionRouter from "./src/routes/TipoCondicionRouter.js";
import TipoEventoRouter from "./src/routes/TipoEventoRouter.js";
import TipoObjetoRouter from "./src/routes/TipoObjetoRouter.js";
import TipoInstrumentoRouter from "./src/routes/TipoInstrumentosRouter.js";

env.config();

const app = express();
const PORT = process.env.PORT;

app.use(json());

app.use("/api/tipoAdjunto", TipoAdjuntoRouter);
app.use("/api/tipoPublicacion", TipoPublicacionRouter);
app.use("/api/tipoCondicion", TipoCondicionRouter);
app.use("/api/tipoEvento", TipoEventoRouter);
app.use("/api/tipoObjeto", TipoObjetoRouter);
app.use("/api/tipoInstrumento", TipoInstrumentoRouter);

await sequelize.sync({ force: true });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});
