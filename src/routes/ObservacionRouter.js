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
  instrumentoEnUsuario,
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
  "/:id/adjuntos/:idAdjunto",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarAdjunto,
  SetAdjunto
);

router.delete(
  "/:id/adjuntos/:idAdjunto",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarAdjunto,
  RemoveAdjunto
);

router.post(
  "/:id/objetos/:idObjeto",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarObjeto,
  SetObjeto
);

router.delete(
  "/:id/objetos/:idObjeto",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarObjeto,
  RemoveObjeto
);

router.post(
  "/:id/eventos/:idEvento",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarEvento,
  SetEvento
);

router.delete(
  "/:id/eventos/:idEvento",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarEvento,
  RemoveEvento
);

router.post(
  "/:id/instrumentos/:idInstrumento",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarInstrumento,
  instrumentoEnUsuario,
  SetInstrumento
);

router.delete(
  "/:id/instrumentos/:idInstrumento",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  EncontrarInstrumento,
  RemoveInstrumento
);

router.get(
  "/:id/objetos",
  verificarTokenOpcional,
  EncontrarObservacion,
  ReadObjeto
);

router.get(
  "/:id/objetos/:idObjeto",
  verificarTokenOpcional,
  EncontrarObservacion,
  EncontrarObservacionObjeto,
  ReadObjetoEspecifico
);

router.get(
  "/:id/eventos",
  verificarTokenOpcional,
  EncontrarObservacion,
  ReadEvento
);

router.get(
  "/:id/eventos/:idEvento",
  verificarTokenOpcional,
  EncontrarObservacion,
  EncontrarObservacionEvento,
  ReadEventoEspecifico
);

router.get(
  "/:id/adjuntos",
  verificarTokenOpcional,
  EncontrarObservacion,
  ReadAdjuntos
);

router.get(
  "/:id/adjuntos/:idAdjunto",
  verificarTokenOpcional,
  EncontrarObservacion,
  EncontrarObservacionAdjunto,
  ReadAdjuntoEspecifico
);

router.get(
  "/:id/instrumentos",
  verificarTokenOpcional,
  EncontrarObservacion,
  ReadInstrumento
);

router.get(
  "/:id/instrumentos/:idInstrumento",
  verificarTokenOpcional,
  EncontrarObservacion,
  EncontrarObservacionInstrumento,
  ReadInstrumentoEspecifico
);

router.put(
  "/visible/:id",
  verificarTokenRequired,
  EncontrarObservacion,
  verificarUsuario,
  VerificarVisibilidad,
  ChangeVisibilidad
);

export default router;
