import { Router } from "express";
import {
  SetAccionUsuario,
  UpdateAccionUsuario,
  DeleteAccionUsuario,
  ReadAccionUsuario,
  ReadAccionUsuarioEspecifico,
  ChangeEstado,
  ReadReportes,
  CountReportesTarget,
  HideReportes,
} from "../controllers/AccionUsuarioController.js";
import {
  ValidarDatosAccionUsuario,
  VerificarExistenciaUsuario,
  EncontrarAccionUsuario,
  ValidarTargetId,
  VerificarEstado,
  ValidarContenido,
} from "../middlewares/AccionUsuarioMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  ValidarDatosAccionUsuario,
  ValidarContenido,
  ValidarTargetId,
  VerificarExistenciaUsuario,
  SetAccionUsuario
);

router.put(
  "/:id",
  verificarTokenRequired,
  EncontrarAccionUsuario,
  ValidarDatosAccionUsuario,
  ValidarContenido,
  VerificarExistenciaUsuario,
  UpdateAccionUsuario
);

router.post(
  "/:id/estado",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarAccionUsuario,
  VerificarEstado,
  ChangeEstado
);

router.put(
  "/visibilidad/:targetType/:targetId",
  verificarTokenRequired,
  tieneRol("administrador"),
  HideReportes
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarAccionUsuario,
  DeleteAccionUsuario
);

router.get(
  "/reportes",
  tieneRol("administrador"),
  verificarTokenRequired,
  ReadReportes
);

router.get(
  "/reportes/:targetType",
  verificarTokenRequired,
  tieneRol("administrador", "moderador"),
  CountReportesTarget
);

router.get(
  "/",
  verificarTokenRequired,
  tieneRol("administrador"),
  ReadAccionUsuario
);

router.get(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarAccionUsuario,
  ReadAccionUsuarioEspecifico
);

export default router;
