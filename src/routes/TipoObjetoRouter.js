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
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  tieneRol("administrador"),
  validateObjectTypeData,
  createObjectTypeHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findObjectType,
  validateObjectTypeData,
  updateObjectTypeHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findObjectType,
  deleteObjectTypeHandler
);

router.get("/", verificarTokenOpcional, validarPageSize, getObjectTypesHandler);

router.get(
  "/:id",
  verificarTokenOpcional,
  findObjectType,
  getObjectTypeHandler
);

export default router;
