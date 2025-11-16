import { Router } from "express";
import {
  createObservationConditionHandler,
  updateObservationConditionHandler,
  deleteObservationConditionHandler,
  getObservationConditionsHandler,
  getObservationConditionHan,
} from "../controllers/ObservacionCondicionController.js";
import {
  findObservationCondition,
  validateObservationConditionData,
  validateObservationExists,
  validateConditionTypeExists,
} from "../middlewares/ObservacionCondicionMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  validateObservationConditionData,
  validateObservationExists,
  validateConditionTypeExists,
  createObservationConditionHandler
);

router.put(
  "/:id",
  findObservationCondition,
  validateObservationConditionData,
  validateObservationExists,
  validateConditionTypeExists,
  updateObservationConditionHandler
);

router.delete(
  "/:id",
  findObservationCondition,
  deleteObservationConditionHandler
);

router.get("/", validarPageSize, getObservationConditionsHandler);

router.get("/:id", findObservationCondition, getObservationConditionHan);

export default router;
