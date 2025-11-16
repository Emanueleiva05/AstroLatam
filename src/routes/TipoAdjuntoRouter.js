import { Router } from "express";
import {
  deleteAttachmentTypeHandler,
  getAttachmentTypeHandler,
  getAttachmentTypesHandler,
  createAttachmentTypeHandler,
  updateAttachmentTypeHandler,
} from "../controllers/TipoAdjuntoController.js";
import {
  findAttachmentType,
  validateAttachmentTypeData,
} from "../middlewares/TipoAdjuntoMiddleware.js";
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
  validateAttachmentTypeData,
  createAttachmentTypeHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findAttachmentType,
  validateAttachmentTypeData,
  updateAttachmentTypeHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findAttachmentType,
  deleteAttachmentTypeHandler
);

router.get(
  "/",
  verificarTokenOpcional,
  validarPageSize,
  getAttachmentTypesHandler
);

router.get(
  "/:id",
  verificarTokenOpcional,
  findAttachmentType,
  getAttachmentTypeHandler
);

export default router;
