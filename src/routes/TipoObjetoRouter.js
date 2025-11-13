import { Router } from "express";
import {
  SetTipoObjeto,
  UpdateTipoObjeto,
  DeleteTipoObjeto,
  ReadTipoObjeto,
  ReadTipoObjetoEspecifico,
} from "../controllers/TipoObjetoController.js";
import {
  EncontrarTipoObjeto,
  ValidarDatosTiposObjeto,
} from "../middlewares/TipoObjetoMiddleware.js";
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
  ValidarDatosTiposObjeto,
  SetTipoObjeto
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoObjeto,
  ValidarDatosTiposObjeto,
  UpdateTipoObjeto
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoObjeto,
  DeleteTipoObjeto
);

router.get("/", verificarTokenOpcional, validarPageSize, ReadTipoObjeto);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarTipoObjeto,
  ReadTipoObjetoEspecifico
);

export default router;
