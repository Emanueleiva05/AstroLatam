import { Router } from "express";
import {
  createLocationHandler,
  updateLocationHandler,
  deleteLocationHandler,
  getLocationsHandler,
  getLocationHandler,
} from "../controllers/UbicacionController.js";
import {
  findLocation,
  validateLocationData,
  validateCityExists,
} from "../middlewares/UbicacionMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
  verificarUsuario,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  validateLocationData,
  validateCityExists,
  createLocationHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  findLocation,
  verificarUsuario,
  validateLocationData,
  validateCityExists,
  updateLocationHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  verificarUsuario,
  findLocation,
  deleteLocationHandler
);

router.get("/", verificarTokenOpcional, validarPageSize, getLocationsHandler);

router.get("/:id", verificarTokenOpcional, findLocation, getLocationHandler);

export default router;
