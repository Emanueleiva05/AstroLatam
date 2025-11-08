import { Router } from "express";
import {
  SetAdjunto,
  DeleteAdjunto,
  UpdateAdjunto,
  ReadAdjuntoEspecifico,
  ReadAdjuntos,
} from "../controllers/AdjuntoController.js";
import {
  ValidarDatosAdjunto,
  VerificarExistenciaTipoAdjunto,
  EncontrarAdjunto,
} from "../middlewares/AdjuntoMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,

  ValidarDatosAdjunto,
  VerificarExistenciaTipoAdjunto,
  SetAdjunto
);

router.put(
  "/:id",
  verificarTokenRequired,

  EncontrarAdjunto,
  ValidarDatosAdjunto,
  VerificarExistenciaTipoAdjunto,
  UpdateAdjunto
);

router.delete("/:id", verificarTokenRequired, EncontrarAdjunto, DeleteAdjunto);

router.get("/", verificarTokenOpcional, ReadAdjuntos);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarAdjunto,
  ReadAdjuntoEspecifico
);

export default router;
