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
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  tieneRol("administrador"),
  validateEventData,
  validateEventTypeExists,
  createEventHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findEvent,
  validateEventData,
  validateEventTypeExists,
  updateEventHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findEvent,
  deleteEventHandler
);

router.get("/", verificarTokenOpcional, validarPageSize, getEventsHandler);

router.get("/:id", verificarTokenOpcional, findEvent, getEventHandler);

router.post(
  "/:id/adjuntos/:idAdjunto",
  verificarTokenRequired,
  tieneRol("administrador"),
  findEvent,
  findAttachment,
  SetAdjunto
);

router.delete(
  "/:id/adjuntos/:idAdjunto",
  verificarTokenRequired,
  tieneRol("administrador"),
  findEvent,
  findAttachment,
  removeAttachmentHandler
);

router.post(
  "/:id/paises/:idPais",
  verificarTokenRequired,
  tieneRol("administrador"),
  findEvent,
  findCountry,
  addCountryHandler
);

router.delete(
  "/:id/paises/:idPais",
  verificarTokenRequired,
  tieneRol("administrador"),
  findEvent,
  findCountry,
  removeCountryHandler
);

router.post(
  "/:id/objetos/:idObjeto",
  verificarTokenRequired,
  tieneRol("administrador"),
  findEvent,
  findObject,
  addObjectHandler
);

router.delete(
  "/:id/objetos/:idObjeto",
  verificarTokenRequired,
  tieneRol("administrador"),
  findEvent,
  findEvent,
  findObject,
  removeObjectHandler
);

router.get(
  "/:id/adjuntos",
  verificarTokenOpcional,
  findEvent,
  getAttachmentsHandler
);

router.get(
  "/:id/adjuntos/:idAdjunto",
  verificarTokenOpcional,
  findEvent,
  findEventAttachment,
  getAttachmentHandler
);

router.get(
  "/:id/paises",
  verificarTokenOpcional,
  findEvent,
  getCountriesHandler
);

router.get(
  "/:id/paises/:idPais",
  verificarTokenOpcional,
  findEvent,
  findEventCountry,
  getCountryHandler
);

router.get(
  "/:id/objetos",
  verificarTokenOpcional,
  findEvent,
  getObjectsHandler
);

router.get(
  "/:id/objetos/:idObjeto",
  verificarTokenOpcional,
  findEvent,
  findEventObject,
  getObjectHandler
);

export default router;
