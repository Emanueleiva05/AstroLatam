import { Router } from "express";
import {
  createCityHandler,
  updateCityHandler,
  deleteCityHandler,
  getCityHandler,
  getCitiesHandler,
} from "../controllers/CiudadController.js";
import {
  validateCityData,
  validateProvinceExists,
  findCity,
} from "../middlewares/CiudadMiddleware.js";
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
  validateCityData,
  validateProvinceExists,
  createCityHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findCity,
  tieneRol("administrador"),
  validateCityData,
  validateProvinceExists,
  updateCityHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findCity,
  tieneRol("administrador"),
  deleteCityHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getCitiesHandler);

router.get("/:id", verifyOptionalToken, findCity, getCityHandler);

export default router;
