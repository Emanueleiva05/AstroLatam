import { Router } from "express";
import {
  createUserActionHandler,
  updateUserActionHandler,
  deleteUserActionHandler,
  getUserActionsHandler,
  getUserActionHandler,
  updateReportStatusHandler,
  getOpenReportsHandler,
  countContentReportsHandler,
  hideReportedContentHandler,
} from "../controllers/AccionUsuarioController.js";
import {
  validateUserActionData,
  validateUserExists,
  findUserAction,
  validateTargetExists,
  validateReportStatus,
  validateContentRequired,
} from "../middlewares/AccionUsuarioMiddleware.js";
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
  validateUserActionData,
  validateContentRequired,
  validateTargetExists,
  validateUserExists,
  createUserActionHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findUserAction,
  validateUserActionData,
  validateContentRequired,
  validateUserExists,
  updateUserActionHandler
);

router.post(
  "/:id/estado",
  verifyRequiredToken,
  tieneRol("administrador"),
  findUserAction,
  validateReportStatus,
  updateReportStatusHandler
);

router.put(
  "/visible/:targetType/:targetId",
  verifyRequiredToken,
  tieneRol("administrador"),
  hideReportedContentHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findUserAction,
  deleteUserActionHandler
);

router.get(
  "/reportes",
  tieneRol("administrador"),
  verifyRequiredToken,
  getOpenReportsHandler
);

router.get(
  "/reportes/:targetType",
  verifyRequiredToken,
  tieneRol("administrador", "moderador"),
  countContentReportsHandler
);

router.get(
  "/",
  verifyRequiredToken,
  tieneRol("administrador"),
  validarPageSize,
  getUserActionsHandler
);

router.get(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findUserAction,
  getUserActionHandler
);

export default router;
