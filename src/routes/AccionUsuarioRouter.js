import { Router } from "express";
import {
  SetAccionUsuario,
  UpdateAccionUsuario,
  DeleteAccionUsuario,
  ReadAccionUsuario,
  ReadAccionUsuarioEspecifico,
} from "../controllers/AccionUsuarioController.js";
import {
  ValidarDatosAccionUsuario,
  VerificarExistenciaUsuario,
  EncontrarAccionUsuario,
  validarContenido,
} from "../middlewares/AccionUsuarioMiddleware.js";

const router = Router();

router.post(
  "/",
  ValidarDatosAccionUsuario,
  validarContenido,
  VerificarExistenciaUsuario,
  SetAccionUsuario
);

router.put(
  "/:id",
  EncontrarAccionUsuario,
  ValidarDatosAccionUsuario,
  validarContenido,
  VerificarExistenciaUsuario,
  UpdateAccionUsuario
);

router.delete("/:id", EncontrarAccionUsuario, DeleteAccionUsuario);

router.get("/", ReadAccionUsuario);

router.get("/:id", EncontrarAccionUsuario, ReadAccionUsuarioEspecifico);

export default router;
