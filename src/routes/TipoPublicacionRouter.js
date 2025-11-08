import { Router } from "express";
import {
  SetTipoPublicacion,
  UpdateTipoPublicacion,
  ReadTipoPublicacion,
  ReadTipoPublicacionEspecifico,
  DeleteTipoPublicacion,
} from "../controllers/TipoPublicacioController.js";
import {
  EncontrarTipoPublicacion,
  ValidarDatosTiposPublicacion,
} from "../middlewares/TipoPublicacionMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  tieneRol("administrador"),
  ValidarDatosTiposPublicacion,
  SetTipoPublicacion
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoPublicacion,
  ValidarDatosTiposPublicacion,
  UpdateTipoPublicacion
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoPublicacion,
  DeleteTipoPublicacion
);

router.get("/", verificarTokenOpcional, ReadTipoPublicacion);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarTipoPublicacion,
  ReadTipoPublicacionEspecifico
);

export default router;
