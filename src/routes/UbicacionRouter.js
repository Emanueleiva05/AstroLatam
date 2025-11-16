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
  verifyOptionalToken,
  verifyRequiredToken,
  verifyUserOwnership,
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
  verifyRequiredToken,
  findLocation,
  verifyUserOwnership,
  validateLocationData,
  validateCityExists,
  updateLocationHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  verifyUserOwnership,
  findLocation,
  deleteLocationHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getLocationsHandler);

router.get("/:id", verifyOptionalToken, findLocation, getLocationHandler);

export default router;
