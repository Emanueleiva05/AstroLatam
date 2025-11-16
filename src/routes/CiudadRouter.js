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
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  validateCityData,
  validateProvinceExists,
  createCityHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  findCity,
  tieneRol("administrador"),
  validateCityData,
  validateProvinceExists,
  updateCityHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  findCity,
  tieneRol("administrador"),
  deleteCityHandler
);

router.get("/", verificarTokenOpcional, validarPageSize, getCitiesHandler);

router.get("/:id", verificarTokenOpcional, findCity, getCityHandler);

export default router;
