import { Router } from "express";
import {
  SetObjeto,
  DeleteObjeto,
  UpdateObjeto,
  ReadObjeto,
  ReadObjetoEspecifico,
  SetAdjunto,
  RemoveAdjunto,
  ReadAdjuntos,
} from "../controllers/ObjetoController.js";
import {
  EncontrarObjeto,
  EncontrarAdjunto,
  ValidarDatosObjeto,
  VerificarExistenciaTipoObjeto,
  EncontrarAdjuntoObjeto,
} from "../middlewares/ObjetoMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  ValidarDatosObjeto,
  VerificarExistenciaTipoObjeto,
  SetObjeto
);

router.put(
  "/:id",
  verificarTokenRequired,
  EncontrarObjeto,
  tieneRol("administrador"),
  ValidarDatosObjeto,
  VerificarExistenciaTipoObjeto,
  UpdateObjeto
);

router.delete(
  "/:id",
  verificarTokenRequired,
  EncontrarObjeto,
  tieneRol("administrador"),
  DeleteObjeto
);

router.get("/", verificarTokenOpcional, ReadObjeto);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarObjeto,
  ReadObjetoEspecifico
);

router.post(
  "/agregarAdjunto/:id/:idAdjunto",
  verificarTokenRequired,
  EncontrarObjeto,
  tieneRol("administrador"),
  EncontrarAdjunto,
  SetAdjunto
);

router.delete(
  "/eliminarAdjunto/:id/:idAdjunto",
  verificarTokenRequired,
  EncontrarObjeto,
  tieneRol("administrador"),
  EncontrarAdjunto,
  RemoveAdjunto
);

router.get(
  "/listarAdjuntos/:id",
  verificarTokenOpcional,
  EncontrarObjeto,
  ReadAdjuntos
);

router.get(
  "/listarAdjuntoEspecifico/:id/:idAdjunto",
  verificarTokenOpcional,
  EncontrarObjeto,
  EncontrarAdjuntoObjeto,
  ReadObjetoEspecifico
);

export default router;
