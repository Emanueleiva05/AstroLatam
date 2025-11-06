import express, { json } from "express";
import env from "dotenv";
import "./src/models/index.js";
import TipoAdjuntoRouter from "./src/routes/TipoAdjuntoRouter.js";
import TipoPublicacionRouter from "./src/routes/TipoPublicacionRouter.js";
import TipoCondicionRouter from "./src/routes/TipoCondicionRouter.js";
import TipoEventoRouter from "./src/routes/TipoEventoRouter.js";
import TipoObjetoRouter from "./src/routes/TipoObjetoRouter.js";
import TipoInstrumentoRouter from "./src/routes/TipoInstrumentosRouter.js";
import UbicacionRouter from "./src/routes/UbicacionRouter.js";
import PaisRouter from "./src/routes/PaisRouter.js";
import ProvinciaRouter from "./src/routes/ProvinciaRouter.js";
import CiudadRouter from "./src/routes/CiudadRouter.js";
import UsuarioRouter from "./src/routes/UsuarioRouter.js";
import AccionUsuarioRouter from "./src/routes/AccionUsuarioRouter.js";
import InstrumentoRouter from "./src/routes/InstrumentoRouter.js";
import AdjuntoRouter from "./src/routes/AdjuntoRouter.js";
import PublicacionRouter from "./src/routes/PublicacionRouter.js";
import ObjetoRouter from "./src/routes/ObjetoRouter.js";
import ObservacionRouter from "./src/routes/ObservacionRouter.js";
import ObservacionCondicionRouter from "./src/routes/ObservacionCondicionRouter.js";
import EventoRouter from "./src/routes/EventoRouter.js";
import AuthRouter from "./src/routes/AuthRouter.js";
import HandleError from "./src/middlewares/HandleError.js";
import RequestLogger from "./src/middlewares/RequestLogger.js";
import cookieParser from "cookie-parser";

env.config();

const app = express();
const PORT = process.env.PORT;
app.use(cookieParser());
app.use(json());
app.use(RequestLogger);

app.use("/api/tipoAdjunto", TipoAdjuntoRouter);
app.use("/api/tipoPublicacion", TipoPublicacionRouter);
app.use("/api/tipoCondicion", TipoCondicionRouter);
app.use("/api/tipoEvento", TipoEventoRouter);
app.use("/api/tipoObjeto", TipoObjetoRouter);
app.use("/api/tipoInstrumento", TipoInstrumentoRouter);
app.use("/api/ubicacion", UbicacionRouter);
app.use("/api/ciudad", CiudadRouter);
app.use("/api/pais", PaisRouter);
app.use("/api/provincia", ProvinciaRouter);
app.use("/api/adjunto", AdjuntoRouter);
app.use("/api/instrumento", InstrumentoRouter);
app.use("/api/usuario", UsuarioRouter);
app.use("/api/accionUsuario", AccionUsuarioRouter);
app.use("/api/publicacion", PublicacionRouter);
app.use("/api/observacion", ObservacionRouter);
app.use("/api/evento", EventoRouter);
app.use("/api/observacionCondicion", ObservacionCondicionRouter);
app.use("/api/objeto", ObjetoRouter);
app.use("/api/auth", AuthRouter);

app.use(HandleError);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});
