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
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  tieneRol("administrador"),
  validateConditionTypeData,
  createAttachmentType
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findConditionType,
  validateConditionTypeData,
  updateAttachmentType
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findConditionType,
  deleteAttachmentType
);

router.get("/", verificarTokenOpcional, validarPageSize, getAttachmentTypes);

router.get(
  "/:id",
  verificarTokenOpcional,
  findConditionType,
  getAttachmentTypeById
);

export default router;
