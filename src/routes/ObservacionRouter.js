import { Router } from "express";
import {
  DeleteObservacion,
  SetObservacion,
  UpdateObservacion,
  ReadObservacion,
  ReadObservacionEspecifico,
  SetAdjunto,
  RemoveAdjunto,
  SetEvento,
  RemoveEvento,
  SetInstrumento,
  RemoveInstrumento,
  SetObjeto,
  RemoveObjeto,
  ReadAdjuntos,
  ReadAdjuntoEspecifico,
  ReadEvento,
  ReadEventoEspecifico,
  ReadInstrumento,
  ReadInstrumentoEspecifico,
  ReadObjeto,
  ReadObjetoEspecifico,
  ChangeVisibilidad,
} from "../controllers/ObservacionController.js";
import {
  EncontrarObservacion,
  ValidarDatosObservacion,
  VerificarExistenciaUbicacion,
  EncontrarAdjunto,
  EncontrarEvento,
  EncontrarInstrumento,
  EncontrarObjeto,
  EncontrarObservacionObjeto,
  EncontrarObservacionEvento,
  EncontrarObservacionAdjunto,
  EncontrarObservacionInstrumento,
  VerificarExistenciaUsuario,
} from "../middlewares/ObservacionMiddleware.js";
import { VerificarVisibilidad } from "../utils/GeneralValidation.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
  verificarUsuario,
} from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post(
  "/",
  ValidarDatosObservacion,
  VerificarExistenciaUbicacion,
  VerificarExistenciaUsuario,
  SetObservacion
);

router.put(
  "/:id",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  ValidarDatosObservacion,
  VerificarExistenciaUbicacion,
  UpdateObservacion
);

router.delete(
  "/:id",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  DeleteObservacion
);

router.get("/", verificarTokenOpcional, ReadObservacion);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarObservacion,
  ReadObservacionEspecifico
);

router.post(
  "/agregarAdjunto/:id/:idAdjunto",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarAdjunto,
  SetAdjunto
);

router.delete(
  "/eliminarAdjunto/:id/:idAdjunto",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarAdjunto,
  RemoveAdjunto
);

router.post(
  "/agregarObjeto/:id/:idObjeto",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarObjeto,
  SetObjeto
);

router.delete(
  "/eliminarObjeto/:id/:idObjeto",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarObjeto,
  RemoveObjeto
);

router.post(
  "/agregarEvento/:id/:idEvento",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarEvento,
  SetEvento
);

router.delete(
  "/eliminarEvento/:id/:idEvento",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarEvento,
  RemoveEvento
);

router.post(
  "/agregarInstrumento/:id/:idInstrumento",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarInstrumento,
  SetInstrumento
);

router.delete(
  "/eliminarInstrumento/:id/:idInstrumento",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarInstrumento,
  RemoveInstrumento
);

router.get(
  "/listarObjetos/:id",
  verificarTokenOpcional,
  EncontrarObservacion,
  ReadObjeto
);

router.get(
  "/listarObjetoEspecifico/:id/:idObjeto",
  verificarTokenOpcional,

  EncontrarObservacion,
  EncontrarObservacionObjeto,
  ReadObjetoEspecifico
);

router.get(
  "/listarEventos/:id",
  verificarTokenOpcional,
  EncontrarObservacion,
  ReadEvento
);

router.get(
  "/listarEventoEspecifico/:id/:idEvento",
  verificarTokenOpcional,
  EncontrarObservacion,
  EncontrarObservacionEvento,
  ReadEventoEspecifico
);

router.get(
  "/listarAdjuntos/:id",
  verificarTokenOpcional,
  EncontrarObservacion,
  ReadAdjuntos
);

router.get(
  "/listarAdjuntoEspecifico/:id/:idAdjunto",
  verificarTokenOpcional,
  EncontrarObservacion,
  EncontrarObservacionAdjunto,
  ReadAdjuntoEspecifico
);

router.get(
  "/listarInstrumentos/:id",
  verificarTokenOpcional,
  EncontrarObservacion,
  ReadInstrumento
);

router.get(
  "/listarInstrumentoEspecifico/:id/:idInstrumento",
  verificarTokenOpcional,
  EncontrarObservacion,
  EncontrarObservacionInstrumento,
  ReadInstrumentoEspecifico
);

router.put(
  "/visibilidad/:id",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  VerificarVisibilidad,
  ChangeVisibilidad
);

export default router;
