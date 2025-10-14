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
import { esAdministrador } from "../utils/RoleUser.js";

const router = Router();

router.post(
  "/",
  esAdministrador,
  ValidarDatosTiposInstrumento,
  SetTipoInstrumento
);

router.put(
  "/:id",
  esAdministrador,
  EncontrarTipoInstrumento,
  ValidarDatosTiposInstrumento,
  UpdateTipoInstrumento
);

router.delete(
  "/:id",
  esAdministrador,
  EncontrarTipoInstrumento,
  DeleteTipoInstrumento
);

router.get("/", ReadTipoInstrumento);

router.get("/:id", EncontrarTipoInstrumento, ReadTipoInstrumentoEspecifico);

export default router;
