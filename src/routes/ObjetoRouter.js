import { Router } from "express";
import {
  createObjectHandler,
  deleteObjectHandler,
  updateObjectHandler,
  getObjectsHandler,
  getObjectHandler,
  addObjectAttachmentHandler,
  removeObjectAttachmentHandler,
  getObjectAttachmentsHandler,
} from "../controllers/ObjetoController.js";
import {
  findObject,
  findAttachment,
  validateObjectData,
  validateObjectTypeExists,
  findObjectAttachment,
} from "../middlewares/ObjetoMiddleware.js";
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
  validateObjectData,
  validateObjectTypeExists,
  createObjectHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findObject,
  tieneRol("administrador"),
  validateObjectData,
  validateObjectTypeExists,
  updateObjectHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findObject,
  tieneRol("administrador"),
  deleteObjectHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getObjectsHandler);

router.get("/:id", verifyOptionalToken, findObject, getObjectHandler);

router.post(
  "/:id/adjuntos/:idAdjunto",
  verifyRequiredToken,
  findObject,
  tieneRol("administrador"),
  findAttachment,
  addObjectAttachmentHandler
);

router.delete(
  "/:id/adjuntos/:idAdjunto",
  verifyRequiredToken,
  findObject,
  tieneRol("administrador"),
  findAttachment,
  removeObjectAttachmentHandler
);

router.get(
  "/:id/adjuntos",
  verifyOptionalToken,
  findObject,
  getObjectAttachmentsHandler
);

router.get(
  "/:id/adjuntos/:idAdjunto",
  verifyOptionalToken,
  findObject,
  findObjectAttachment,
  getObjectHandler
);

export default router;
