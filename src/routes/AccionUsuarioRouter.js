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

const router = Router();

router.post(
  "/",
  ValidarDatosAccionUsuario,
  ValidarContenido,
  ValidarTargetId,
  VerificarExistenciaUsuario,
  SetAccionUsuario
);

router.put(
  "/:id",
  EncontrarAccionUsuario,
  ValidarDatosAccionUsuario,
  ValidarContenido,
  VerificarExistenciaUsuario,
  UpdateAccionUsuario
);

router.post(
  "/:id/estado",
  EncontrarAccionUsuario,
  VerificarEstado,
  ChangeEstado
);

router.put("/visibilidad/:targetType/:targetId", HideReportes);

router.delete("/:id", EncontrarAccionUsuario, DeleteAccionUsuario);

router.get("/reportes", ReadReportes);

router.get("/reportes/:targetType", CountReportesTarget);

router.get("/", ReadAccionUsuario);

router.get("/:id", EncontrarAccionUsuario, ReadAccionUsuarioEspecifico);

export default router;
