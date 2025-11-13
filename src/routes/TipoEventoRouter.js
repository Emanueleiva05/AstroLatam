import { Router } from "express";
import {
  SetTipoEvento,
  DeleteTipoEvento,
  UpdateTipoEvento,
  ReadTipoEvento,
  ReadTiposEvento,
} from "../controllers/TipoEventoController.js";
import {
  ValidarDatosTiposEvento,
  EncontrarTipoEvento,
} from "../middlewares/TipoEventoMiddleware.js";
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
  ValidarDatosTiposEvento,
  SetTipoEvento
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoEvento,
  ValidarDatosTiposEvento,
  UpdateTipoEvento
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoEvento,
  DeleteTipoEvento
);

router.get("/", verificarTokenOpcional, validarPageSize, ReadTiposEvento);

router.get("/:id", verificarTokenOpcional, EncontrarTipoEvento, ReadTipoEvento);

export default router;
