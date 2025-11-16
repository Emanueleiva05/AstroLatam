import { Router } from "express";
import {
  createAttachmentType,
  deleteAttachmentType,
  updateAttachmentType,
  getAttachmentTypeById,
  getAttachmentTypes,
} from "../controllers/TipoCondicionController.js";
import {
  validateConditionTypeData,
  findConditionType,
} from "../middlewares/TipoCondicionMiddleware.js";
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
  validateConditionTypeData,
  createAttachmentType
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findConditionType,
  validateConditionTypeData,
  updateAttachmentType
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findConditionType,
  deleteAttachmentType
);

router.get("/", verifyOptionalToken, validarPageSize, getAttachmentTypes);

router.get(
  "/:id",
  verifyOptionalToken,
  findConditionType,
  getAttachmentTypeById
);

export default router;
