import { Router } from "express";
import {
  createEventHandler,
  deleteEventHandler,
  updateEventHandler,
  getEventsHandler,
  getEventHandler,
  SetAdjunto,
  removeAttachmentHandler,
  addObjectHandler,
  removeObjectHandler,
  addCountryHandler,
  removeCountryHandler,
  getAttachmentHandler,
  getAttachmentsHandler,
  getCountriesHandler,
  getCountryHandler,
  getObjectsHandler,
  getObjectHandler,
} from "../controllers/EventoController.js";
import {
  findEvent,
  findAttachment,
  validateEventData,
  validateEventTypeExists,
  findObject,
  findCountry,
  findEventAttachment,
  findEventCountry,
  findEventObject,
} from "../middlewares/EventoMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verifyRequiredToken,
  tieneRol("administrador"),
  validateEventData,
  validateEventTypeExists,
  createEventHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  validateEventData,
  validateEventTypeExists,
  updateEventHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  deleteEventHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getEventsHandler);

router.get("/:id", verifyOptionalToken, findEvent, getEventHandler);

router.post(
  "/:id/adjuntos/:idAdjunto",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findAttachment,
  SetAdjunto
);

router.delete(
  "/:id/adjuntos/:idAdjunto",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findAttachment,
  removeAttachmentHandler
);

router.post(
  "/:id/paises/:idPais",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findCountry,
  addCountryHandler
);

router.delete(
  "/:id/paises/:idPais",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findCountry,
  removeCountryHandler
);

router.post(
  "/:id/objetos/:idObjeto",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findObject,
  addObjectHandler
);

router.delete(
  "/:id/objetos/:idObjeto",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEvent,
  findEvent,
  findObject,
  removeObjectHandler
);

router.get(
  "/:id/adjuntos",
  verifyOptionalToken,
  findEvent,
  getAttachmentsHandler
);

router.get(
  "/:id/adjuntos/:idAdjunto",
  verifyOptionalToken,
  findEvent,
  findEventAttachment,
  getAttachmentHandler
);

router.get("/:id/paises", verifyOptionalToken, findEvent, getCountriesHandler);

router.get(
  "/:id/paises/:idPais",
  verifyOptionalToken,
  findEvent,
  findEventCountry,
  getCountryHandler
);

router.get("/:id/objetos", verifyOptionalToken, findEvent, getObjectsHandler);

router.get(
  "/:id/objetos/:idObjeto",
  verifyOptionalToken,
  findEvent,
  findEventObject,
  getObjectHandler
);

export default router;
