import { Router } from "express";
import {
  createEventTypeHandler,
  deleteEventTypeHandler,
  updateEventTypeHandler,
  getEventTypeHandler,
  getEventTypesHandler,
} from "../controllers/TipoEventoController.js";
import {
  validateEventTypeData,
  findEventType,
} from "../middlewares/TipoEventoMiddleware.js";
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
  validateEventTypeData,
  createEventTypeHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEventType,
  validateEventTypeData,
  updateEventTypeHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEventType,
  deleteEventTypeHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getEventTypesHandler);

router.get("/:id", verifyOptionalToken, findEventType, getEventTypeHandler);

export default router;
