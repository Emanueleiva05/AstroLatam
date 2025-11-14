import { Router } from "express";
import {
  SetEvento,
  DeleteEvento,
  UpdateEvento,
  ReadEvento,
  ReadEventoEspecifico,
  SetAdjunto,
  RemoveAdjunto,
  SetObjeto,
  RemoveObjeto,
  SetPais,
  RemovePais,
  ReadAdjuntoEspecifico,
  ReadAdjuntos,
  ReadPaises,
  ReadPaisEspecifico,
  ReadObjetos,
  ReadObjetoEspecifico,
} from "../controllers/EventoController.js";
import {
  EncontrarEvento,
  EncontrarAdjunto,
  ValidarDatosEvento,
  VerificarExistenciaTipoEvento,
  EncontrarObjeto,
  EncontrarPais,
  EncontrarAdjuntoEvento,
  EncontrarPaisEvento,
  EncontrarObjetosEvento,
} from "../middlewares/EventoMiddleware.js";
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
  ValidarDatosEvento,
  VerificarExistenciaTipoEvento,
  SetEvento
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  ValidarDatosEvento,
  VerificarExistenciaTipoEvento,
  UpdateEvento
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  DeleteEvento
);

router.get("/", verificarTokenOpcional, validarPageSize, ReadEvento);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarEvento,
  ReadEventoEspecifico
);

router.post(
  "/agregarAdjunto/:id/:idAdjunto",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarAdjunto,
  SetAdjunto
);

router.delete(
  "/eliminarAdjunto/:id/:idAdjunto",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarAdjunto,
  RemoveAdjunto
);

router.post(
  "/agregarPais/:id/:idPais",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarPais,
  SetPais
);

router.delete(
  "/eliminarPais/:id/:idPais",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarPais,
  RemovePais
);

router.post(
  "/agregarObjeto/:id/:idObjeto",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarObjeto,
  SetObjeto
);

router.delete(
  "/eliminarObjeto/:id/:idObjeto",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarEvento,
  EncontrarObjeto,
  RemoveObjeto
);

router.get(
  "/listarAdjuntos/:id",
  verificarTokenOpcional,
  EncontrarEvento,
  ReadAdjuntos
);

router.get(
  "/listarInstrumentosEspecifico/:id/:idAdjunto",
  verificarTokenOpcional,
  EncontrarEvento,
  EncontrarAdjuntoEvento,
  ReadAdjuntoEspecifico
);

router.get(
  "/listarPaises/:id",
  verificarTokenOpcional,
  EncontrarEvento,
  ReadPaises
);

router.get(
  "/listarPaisEspecifico/:id/:idPais",
  verificarTokenOpcional,
  EncontrarEvento,
  EncontrarPaisEvento,
  ReadPaisEspecifico
);

router.get(
  "/listarObjetos/:id",
  verificarTokenOpcional,
  EncontrarEvento,
  ReadObjetos
);

router.get(
  "/listarObjetoEspecifico/:id/:idObjeto",
  verificarTokenOpcional,
  EncontrarEvento,
  EncontrarObjetosEvento,
  ReadObjetoEspecifico
);

export default router;
