import { Router } from "express";
import {
  deleteObservationHandler,
  createObservationHandler,
  updateObservationHandler,
  getObservationsHandler,
  getObservationHandler,
  addObservationAttachmentHandler,
  removeObservationAttachmentHandler,
  addObservationEventHandler,
  removeObservationEventHandler,
  addObservationInstrumentHandler,
  removeObservationInstrumentHandler,
  addObservationObjectHandler,
  removeObservationObjectHandler,
  getObservationAttachmentsHandler,
  getObservationAttachmentHandler,
  getObservationEventsHandler,
  getObservationEventHandler,
  getObservationInstrumentsHandler,
  getObservationInstrumentHandler,
  getObservationObjectsHandler,
  getObservationObjectHandler,
  updateObservationVisibilityHandler,
} from "../controllers/ObservacionController.js";
import {
  findObservation,
  validateObservationData,
  validateLocationExists,
  findAttachment,
  findEvent,
  findInstrument,
  findObject,
  findObservationObject,
  findObservationEvent,
  findObservationAttachment,
  findObservationInstrument,
  validateUserExists,
  validateUserInstrument,
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
  validateObservationData,
  validateLocationExists,
  validateUserExists,
  createObservationHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  findObservation,
  verificarUsuario,
  validateObservationData,
  validateLocationExists,
  updateObservationHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  findObservation,
  verificarUsuario,
  deleteObservationHandler
);

router.get("/", verificarTokenOpcional, getObservationsHandler);

router.get(
  "/:id",
  verificarTokenOpcional,
  findObservation,
  getObservationHandler
);

router.post(
  "/:id/adjuntos/:idAdjunto",
  verificarTokenRequired,
  findObservation,
  verificarUsuario,
  findAttachment,
  addObservationAttachmentHandler
);

router.delete(
  "/:id/adjuntos/:idAdjunto",
  verificarTokenRequired,
  findObservation,
  verificarUsuario,
  findAttachment,
  removeObservationAttachmentHandler
);

router.post(
  "/:id/objetos/:idObjeto",
  verificarTokenRequired,
  findObservation,
  verificarUsuario,
  findObject,
  addObservationObjectHandler
);

router.delete(
  "/:id/objetos/:idObjeto",
  verificarTokenRequired,
  findObservation,
  verificarUsuario,
  findObject,
  removeObservationObjectHandler
);

router.post(
  "/:id/eventos/:idEvento",
  verificarTokenRequired,
  findObservation,
  verificarUsuario,
  findEvent,
  addObservationEventHandler
);

router.delete(
  "/:id/eventos/:idEvento",
  verificarTokenRequired,
  findObservation,
  verificarUsuario,
  findEvent,
  removeObservationEventHandler
);

router.post(
  "/:id/instrumentos/:idInstrumento",
  verificarTokenRequired,
  findObservation,
  verificarUsuario,
  findInstrument,
  validateUserInstrument,
  addObservationInstrumentHandler
);

router.delete(
  "/:id/instrumentos/:idInstrumento",
  verificarTokenRequired,
  findObservation,
  verificarUsuario,
  findInstrument,
  removeObservationInstrumentHandler
);

router.get(
  "/:id/objetos",
  verificarTokenOpcional,
  findObservation,
  getObservationObjectsHandler
);

router.get(
  "/:id/objetos/:idObjeto",
  verificarTokenOpcional,
  findObservation,
  findObservationObject,
  getObservationObjectHandler
);

router.get(
  "/:id/eventos",
  verificarTokenOpcional,
  findObservation,
  getObservationEventsHandler
);

router.get(
  "/:id/eventos/:idEvento",
  verificarTokenOpcional,
  findObservation,
  findObservationEvent,
  getObservationEventHandler
);

router.get(
  "/:id/adjuntos",
  verificarTokenOpcional,
  findObservation,
  getObservationAttachmentsHandler
);

router.get(
  "/:id/adjuntos/:idAdjunto",
  verificarTokenOpcional,
  findObservation,
  findObservationAttachment,
  getObservationAttachmentHandler
);

router.get(
  "/:id/instrumentos",
  verificarTokenOpcional,
  findObservation,
  getObservationInstrumentsHandler
);

router.get(
  "/:id/instrumentos/:idInstrumento",
  verificarTokenOpcional,
  findObservation,
  findObservationInstrument,
  getObservationInstrumentHandler
);

router.put(
  "/visible/:id",
  verificarTokenRequired,
  findObservation,
  verificarUsuario,
  VerificarVisibilidad,
  updateObservationVisibilityHandler
);

export default router;
