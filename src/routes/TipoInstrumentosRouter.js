import { Router } from "express";
import {
  SetTipoInstrumento,
  DeleteTipoInstrumento,
  UpdateTipoInstrumento,
  ReadTipoInstrumento,
  ReadTipoInstrumentoEspecifico,
} from "../controllers/TipoInstrumentoController.js";
import {
  EncontrarTipoInstrumento,
  ValidarDatosTiposInstrumento,
} from "../middlewares/TipoInstrumentoMiddleware.js";

const router = Router();

router.post("/", ValidarDatosTiposInstrumento, SetTipoInstrumento);

router.put(
  "/:id",
  EncontrarTipoInstrumento,
  ValidarDatosTiposInstrumento,
  UpdateTipoInstrumento
);

router.delete("/:id", EncontrarTipoInstrumento, DeleteTipoInstrumento);

router.get("/", ReadTipoInstrumento);

router.get("/:id", EncontrarTipoInstrumento, ReadTipoInstrumentoEspecifico);

export default router;
