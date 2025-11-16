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
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  validateAttachmentData,
  validateAttachmentTypeExists,
  createAttachmentHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  findAttachment,
  validateAttachmentData,
  validateAttachmentTypeExists,
  updateAttachmentHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  findAttachment,
  deleteAttachmentHandler
);

router.get("/", verificarTokenOpcional, validarPageSize, getAttachmentsHandler);

router.get(
  "/:id",
  verificarTokenOpcional,
  findAttachment,
  getAttachmentHandler
);

export default router;
