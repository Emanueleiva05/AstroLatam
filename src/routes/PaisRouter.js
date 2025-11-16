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
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post("/", validateCountryData, createCountryHandler);

router.put(
  "/:id",
  verificarTokenRequired,
  findCountry,
  tieneRol("administrador"),
  validateCountryData,
  updateCountryHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  findCountry,
  tieneRol("administrador"),
  deleteCountryHandler
);

router.get("/", verificarTokenOpcional, validarPageSize, getCountriesHandler);

router.get("/:id", verificarTokenOpcional, findCountry, getCountryHandler);

export default router;
