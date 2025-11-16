import { Router } from "express";
import {
  createProvinceHandler,
  updateProvinceHandler,
  deleteProvinceHandler,
  getProvinceHandler,
  getProvincesHandler,
} from "../controllers/ProvinciaController.js";

import {
  findProvince,
  validateProvinceData,
  validateCountryExists,
} from "../middlewares/ProvinciaMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  validateProvinceData,
  validateCountryExists,
  createProvinceHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  findProvince,
  tieneRol("administrador"),
  validateProvinceData,
  validateCountryExists,
  updateProvinceHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  findProvince,
  tieneRol("administrador"),
  deleteProvinceHandler
);

router.get("/", verificarTokenOpcional, validarPageSize, getProvincesHandler);

router.get("/:id", verificarTokenOpcional, findProvince, getProvinceHandler);

export default router;
