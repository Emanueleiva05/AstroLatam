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

/**
 * @swagger
 * tags:
 *   name: TipoAdjunto
 *   description: Gestión de tipos de adjuntos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TipoAdjunto:
 *       type: object
 *       properties:
 *         idTipoAdjunto:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "imagen"
 *       required:
 *         - nombre
 */

/**
 * @swagger
 * /tipoAdjunto:
 *   get:
 *     summary: Obtener todos los tipos de adjuntos
 *     tags: [TipoAdjunto]
 *     responses:
 *       200:
 *         description: Lista de tipos de adjuntos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/TipoAdjunto"
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoAdjunto/{id}:
 *   get:
 *     summary: Obtener un tipo de adjunto por ID
 *     tags: [TipoAdjunto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de adjunto
 *     responses:
 *       200:
 *         description: Tipo de adjunto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoAdjunto"
 *       404:
 *         description: No se encontró el tipo de adjunto
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoAdjunto:
 *   post:
 *     summary: Crear un nuevo tipo de adjunto
 *     tags: [TipoAdjunto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoAdjunto"
 *     responses:
 *       201:
 *         description: Tipo de adjunto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoAdjunto"
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoAdjunto/{id}:
 *   put:
 *     summary: Actualizar un tipo de adjunto existente
 *     tags: [TipoAdjunto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de adjunto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoAdjunto"
 *     responses:
 *       200:
 *         description: Tipo de adjunto actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: No se encontró el tipo de adjunto
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoAdjunto/{id}:
 *   delete:
 *     summary: Eliminar un tipo de adjunto
 *     tags: [TipoAdjunto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de adjunto
 *     responses:
 *       200:
 *         description: Tipo de adjunto eliminado correctamente
 *       404:
 *         description: No se encontró el tipo de adjunto
 *       500:
 *         description: Error interno del servidor
 */
