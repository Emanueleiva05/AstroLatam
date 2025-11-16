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
  verifyOptionalToken,
  verifyRequiredToken,
  verifyUserOwnership,
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
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  validateObservationData,
  validateLocationExists,
  updateObservationHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  deleteObservationHandler
);

router.get("/", verifyOptionalToken, getObservationsHandler);

router.get("/:id", verifyOptionalToken, findObservation, getObservationHandler);

router.post(
  "/:id/adjuntos/:idAdjunto",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findAttachment,
  addObservationAttachmentHandler
);

router.delete(
  "/:id/adjuntos/:idAdjunto",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findAttachment,
  removeObservationAttachmentHandler
);

router.post(
  "/:id/objetos/:idObjeto",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findObject,
  addObservationObjectHandler
);

router.delete(
  "/:id/objetos/:idObjeto",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findObject,
  removeObservationObjectHandler
);

router.post(
  "/:id/eventos/:idEvento",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findEvent,
  addObservationEventHandler
);

router.delete(
  "/:id/eventos/:idEvento",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findEvent,
  removeObservationEventHandler
);

router.post(
  "/:id/instrumentos/:idInstrumento",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findInstrument,
  validateUserInstrument,
  addObservationInstrumentHandler
);

router.delete(
  "/:id/instrumentos/:idInstrumento",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  findInstrument,
  removeObservationInstrumentHandler
);

router.get(
  "/:id/objetos",
  verifyOptionalToken,
  findObservation,
  getObservationObjectsHandler
);

router.get(
  "/:id/objetos/:idObjeto",
  verifyOptionalToken,
  findObservation,
  findObservationObject,
  getObservationObjectHandler
);

router.get(
  "/:id/eventos",
  verifyOptionalToken,
  findObservation,
  getObservationEventsHandler
);

router.get(
  "/:id/eventos/:idEvento",
  verifyOptionalToken,
  findObservation,
  findObservationEvent,
  getObservationEventHandler
);

router.get(
  "/:id/adjuntos",
  verifyOptionalToken,
  findObservation,
  getObservationAttachmentsHandler
);

router.get(
  "/:id/adjuntos/:idAdjunto",
  verifyOptionalToken,
  findObservation,
  findObservationAttachment,
  getObservationAttachmentHandler
);

router.get(
  "/:id/instrumentos",
  verifyOptionalToken,
  findObservation,
  getObservationInstrumentsHandler
);

router.get(
  "/:id/instrumentos/:idInstrumento",
  verifyOptionalToken,
  findObservation,
  findObservationInstrument,
  getObservationInstrumentHandler
);

router.put(
  "/visible/:id",
  verifyRequiredToken,
  findObservation,
  verifyUserOwnership,
  VerificarVisibilidad,
  updateObservationVisibilityHandler
);

export default router;
