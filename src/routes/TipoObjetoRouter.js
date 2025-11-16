import { Router } from "express";
import {
  createObjectTypeHandler,
  updateObjectTypeHandler,
  deleteObjectTypeHandler,
  getObjectTypesHandler,
  getObjectTypeHandler,
} from "../controllers/TipoObjetoController.js";
import {
  findObjectType,
  validateObjectTypeData,
} from "../middlewares/TipoObjetoMiddleware.js";
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
  tieneRol("administrador"),
  validateObjectTypeData,
  createObjectTypeHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findObjectType,
  validateObjectTypeData,
  updateObjectTypeHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findObjectType,
  deleteObjectTypeHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getObjectTypesHandler);

router.get("/:id", verifyOptionalToken, findObjectType, getObjectTypeHandler);

export default router;
