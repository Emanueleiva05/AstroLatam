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
  verifyOptionalToken,
  verifyRequiredToken,
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
  verifyRequiredToken,
  findProvince,
  tieneRol("administrador"),
  validateProvinceData,
  validateCountryExists,
  updateProvinceHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findProvince,
  tieneRol("administrador"),
  deleteProvinceHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getProvincesHandler);

router.get("/:id", verifyOptionalToken, findProvince, getProvinceHandler);

export default router;
