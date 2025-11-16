import { Router } from "express";
import {
  createAttachmentHandler,
  deleteAttachmentHandler,
  updateAttachmentHandler,
  getAttachmentHandler,
  getAttachmentsHandler,
} from "../controllers/AdjuntoController.js";
import {
  validateAttachmentData,
  validateAttachmentTypeExists,
  findAttachment,
} from "../middlewares/AdjuntoMiddleware.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verifyRequiredToken,
  validateAttachmentData,
  validateAttachmentTypeExists,
  createAttachmentHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findAttachment,
  validateAttachmentData,
  validateAttachmentTypeExists,
  updateAttachmentHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findAttachment,
  deleteAttachmentHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getAttachmentsHandler);

router.get("/:id", verifyOptionalToken, findAttachment, getAttachmentHandler);

export default router;
