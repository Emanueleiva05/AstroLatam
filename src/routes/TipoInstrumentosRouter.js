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
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  tieneRol("administrador"),
  ValidarDatosTiposInstrumento,
  SetTipoInstrumento
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoInstrumento,
  ValidarDatosTiposInstrumento,
  UpdateTipoInstrumento
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoInstrumento,
  DeleteTipoInstrumento
);

router.get("/", verificarTokenOpcional, validarPageSize, ReadTipoInstrumento);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarTipoInstrumento,
  ReadTipoInstrumentoEspecifico
);

export default router;
