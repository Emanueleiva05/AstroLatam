import { Router } from "express";
import {
  createCountryHandler,
  updateCountryHandler,
  deleteCountryHandler,
  getCountryHandler,
  getCountriesHandler,
} from "../controllers/PaisController.js";
import {
  validateCountryData,
  findCountry,
} from "../middlewares/PaisMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post("/", validateCountryData, createCountryHandler);

router.put(
  "/:id",
  verifyRequiredToken,
  findCountry,
  tieneRol("administrador"),
  validateCountryData,
  updateCountryHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findCountry,
  tieneRol("administrador"),
  deleteCountryHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getCountriesHandler);

router.get("/:id", verifyOptionalToken, findCountry, getCountryHandler);

export default router;
