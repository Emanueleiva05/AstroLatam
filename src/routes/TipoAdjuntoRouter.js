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
  verifyOptionalToken,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verifyRequiredToken,
  tieneRol("administrador"),
  validateAttachmentTypeData,
  createAttachmentTypeHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findAttachmentType,
  validateAttachmentTypeData,
  updateAttachmentTypeHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findAttachmentType,
  deleteAttachmentTypeHandler
);

router.get(
  "/",
  verifyOptionalToken,
  validarPageSize,
  getAttachmentTypesHandler
);

router.get(
  "/:id",
  verifyOptionalToken,
  findAttachmentType,
  getAttachmentTypeHandler
);

export default router;
