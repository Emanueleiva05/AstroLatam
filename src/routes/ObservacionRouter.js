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
} from "../middlewares/ObservacionMiddleware.js";
import { VerificarVisibilidad } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  ValidarDatosObservacion,
  VerificarExistenciaUbicacion,
  SetObservacion
);

router.put(
  "/:id",
  EncontrarObservacion,
  ValidarDatosObservacion,
  VerificarExistenciaUbicacion,
  UpdateObservacion
);

router.delete("/:id", EncontrarObservacion, DeleteObservacion);

router.get("/", ReadObservacion);

router.get("/:id", EncontrarObservacion, ReadObservacionEspecifico);

router.post(
  "/agregarAdjunto/:id/:idAdjunto",
  EncontrarObservacion,
  EncontrarAdjunto,
  SetAdjunto
);

router.delete(
  "/eliminarAdjunto/:id/:idAdjunto",
  EncontrarObservacion,
  EncontrarAdjunto,
  RemoveAdjunto
);

router.post(
  "/agregarObjeto/:id/:idObjeto",
  EncontrarObservacion,
  EncontrarObjeto,
  SetObjeto
);

router.delete(
  "/eliminarObjeto/:id/:idObjeto",
  EncontrarObservacion,
  EncontrarObjeto,
  RemoveObjeto
);

router.post(
  "/agregarEvento/:id/:idEvento",
  EncontrarObservacion,
  EncontrarEvento,
  SetEvento
);

router.delete(
  "/eliminarEvento/:id/:idEvento",
  EncontrarObservacion,
  EncontrarEvento,
  RemoveEvento
);

router.post(
  "/agregarInstrumento/:id/:idInstrumento",
  EncontrarObservacion,
  EncontrarInstrumento,
  SetInstrumento
);

router.delete(
  "/eliminarInstrumento/:id/:idInstrumento",
  EncontrarObservacion,
  EncontrarInstrumento,
  RemoveInstrumento
);

router.get("/listarObjetos/:id", EncontrarObservacion, ReadObjeto);

router.get(
  "/listarObjetoEspecifico/:id/:idObjeto",
  EncontrarObservacion,
  EncontrarObservacionObjeto,
  ReadObjetoEspecifico
);

router.get("/listarEventos/:id", EncontrarObservacion, ReadEvento);

router.get(
  "/listarEventoEspecifico/:id/:idEvento",
  EncontrarObservacion,
  EncontrarObservacionEvento,
  ReadEventoEspecifico
);

router.get("/listarAdjuntos/:id", EncontrarObservacion, ReadAdjuntos);

router.get(
  "/listarAdjuntoEspecifico/:id/:idAdjunto",
  EncontrarObservacion,
  EncontrarObservacionAdjunto,
  ReadAdjuntoEspecifico
);

router.get("/listarInstrumentos/:id", EncontrarObservacion, ReadInstrumento);

router.get(
  "/listarInstrumentoEspecifico/:id/:idInstrumento",
  EncontrarObservacion,
  EncontrarObservacionInstrumento,
  ReadInstrumentoEspecifico
);

router.put(
  "/visibilidad/:id",
  EncontrarObservacion,
  VerificarVisibilidad,
  ChangeVisibilidad
);

export default router;
