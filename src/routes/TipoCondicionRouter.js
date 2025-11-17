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

/**
 * @swagger
 * tags:
 *   name: TipoCondicion
 *   description: Gestión de tipos de condiciones
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TipoCondicion:
 *       type: object
 *       properties:
 *         idTipoCondicion:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Nublado"
 *       required:
 *         - nombre
 */

/**
 * @swagger
 * /tipoCondicion:
 *   get:
 *     summary: Obtener todos los tipos de condicion
 *     tags: [TipoCondicion]
 *     responses:
 *       200:
 *         description: Lista de tipos de condiciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/TipoCondicion"
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoCondicion/{id}:
 *   get:
 *     summary: Obtener un tipo de condicion por ID
 *     tags: [TipoCondicion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de condicion
 *     responses:
 *       200:
 *         description: Tipo de condicion obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoCondicion"
 *       404:
 *         description: No se encontró el tipo de condicion
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoCondicion:
 *   post:
 *     summary: Crear un nuevo tipo de condicion
 *     tags: [TipoCondicion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoCondicion"
 *     responses:
 *       201:
 *         description: Tipo de condicion creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoCondicion"
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoCondicion/{id}:
 *   put:
 *     summary: Actualizar un tipo de condicion existente
 *     tags: [TipoCondicion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de condicion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoCondicion"
 *     responses:
 *       200:
 *         description: Tipo de condicion actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: No se encontró el tipo de adjunto
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoCondicion/{id}:
 *   delete:
 *     summary: Eliminar un tipo de condicion
 *     tags: [TipoCondicion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de condicion
 *     responses:
 *       200:
 *         description: Tipo de condicion eliminado correctamente
 *       404:
 *         description: No se encontró el tipo de condicion
 *       500:
 *         description: Error interno del servidor
 */
