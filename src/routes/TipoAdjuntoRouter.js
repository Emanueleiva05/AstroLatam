import { Router } from "express";
import {
  DeleteTipoAdjunto,
  ReadTipoAdjunto,
  ReadTiposAdjuntos,
  SetTipoAdjunto,
  UpdateTipoAdjunto,
} from "../controllers/TipoAdjuntoController.js";
import {
  EncontrarTipoAdjunto,
  ValidarDatosTiposAdjunto,
} from "../middlewares/TipoAdjuntoMiddleware.js";
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
  ValidarDatosTiposAdjunto,
  SetTipoAdjunto
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoAdjunto,
  ValidarDatosTiposAdjunto,
  UpdateTipoAdjunto
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoAdjunto,
  DeleteTipoAdjunto
);

router.get("/", verificarTokenOpcional, validarPageSize, ReadTiposAdjuntos);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarTipoAdjunto,
  ReadTipoAdjunto
);

export default router;
