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
} from "../controllers/ObservacionController.js";
import {
  EncontrarObservacion,
  ValidarDatosObservacion,
  VerificarExistenciaUbicacion,
  EncontrarAdjunto,
  EncontrarEvento,
  EncontrarInstrumento,
  EncontrarObjeto,
} from "../middlewares/ObservacionMiddleware.js";

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

export default router;
