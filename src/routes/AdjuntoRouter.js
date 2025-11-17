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

/**
 * @swagger
 * tags:
 *   name: Adjunto
 *   description: Gestión de adjuntos (imágenes, archivos, etc.)
 */

/**
 * @swagger
 * /adjunto:
 *   get:
 *     summary: Obtener lista paginada de adjuntos
 *     tags: [Adjunto]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 0
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: Lista de adjuntos
 *       404:
 *         description: No hay adjuntos
 */

/**
 * @swagger
 * /adjunto/{id}:
 *   get:
 *     summary: Obtener un adjunto por su ID
 *     tags: [Adjunto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Adjunto encontrado
 *       404:
 *         description: No existe el adjunto
 */

/**
 * @swagger
 * /adjunto:
 *   post:
 *     summary: Crear adjunto
 *     tags: [Adjunto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               idTipoAdjunto:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Adjunto creado
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /adjunto/{id}:
 *   put:
 *     summary: Actualizar adjunto
 *     tags: [Adjunto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Adjunto actualizado
 */

/**
 * @swagger
 * /adjunto/{id}:
 *   delete:
 *     summary: Eliminar adjunto
 *     tags: [Adjunto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Adjunto eliminado
 */
