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
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  tieneRol("administrador"),
  validateEventTypeData,
  createEventTypeHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findEventType,
  validateEventTypeData,
  updateEventTypeHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findEventType,
  deleteEventTypeHandler
);

router.get("/", verificarTokenOpcional, validarPageSize, getEventTypesHandler);

router.get("/:id", verificarTokenOpcional, findEventType, getEventTypeHandler);

export default router;
