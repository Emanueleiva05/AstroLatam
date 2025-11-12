import { Router } from "express";
import {
  SetTipoCondicion,
  DeleteTipoCondicion,
  UpdateTipoCondicion,
  ReadTipoCondicion,
  ReadTiposCondiciones,
} from "../controllers/TipoCondicionController.js";
import {
  ValidarDatosTiposCondicion,
  EncontrarTipoCondicion,
} from "../middlewares/TipoCondicionMiddleware.js";
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
  ValidarDatosTiposCondicion,
  SetTipoCondicion
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoCondicion,
  ValidarDatosTiposCondicion,
  UpdateTipoCondicion
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarTipoCondicion,
  DeleteTipoCondicion
);

router.get("/", verificarTokenOpcional, ReadTiposCondiciones);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarTipoCondicion,
  ReadTipoCondicion
);

export default router;
