import { Router } from "express";
import {
  createEventTypeHandler,
  deleteEventTypeHandler,
  updateEventTypeHandler,
  getEventTypeHandler,
  getEventTypesHandler,
} from "../controllers/TipoEventoController.js";
import {
  validateEventTypeData,
  findEventType,
} from "../middlewares/TipoEventoMiddleware.js";
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
  validateEventTypeData,
  createEventTypeHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEventType,
  validateEventTypeData,
  updateEventTypeHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findEventType,
  deleteEventTypeHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getEventTypesHandler);

router.get("/:id", verifyOptionalToken, findEventType, getEventTypeHandler);

export default router;

/**
 * @swagger
 * tags:
 *   name: TipoEvento
 *   description: Gestión de tipos de evento
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TipoEvento:
 *       type: object
 *       properties:
 *         idTipoEvento:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Lluvia de meteoritos"
 *       required:
 *         - nombre
 */

/**
 * @swagger
 * /tipoEvento:
 *   get:
 *     summary: Obtener todos los tipos de evento
 *     tags: [TipoEvento]
 *     responses:
 *       200:
 *         description: Lista de tipos de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/TipoEvento"
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoEvento/{id}:
 *   get:
 *     summary: Obtener un tipo de evento por ID
 *     tags: [TipoEvento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de evento
 *     responses:
 *       200:
 *         description: Tipo de evento obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoEvento"
 *       404:
 *         description: No se encontró el tipo de evento
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoEvento:
 *   post:
 *     summary: Crear un nuevo tipo de evento
 *     tags: [TipoEvento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoEvento"
 *     responses:
 *       201:
 *         description: Tipo de evento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoEvento"
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoEvento/{id}:
 *   put:
 *     summary: Actualizar un tipo de evento existente
 *     tags: [TipoEvento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoEvento"
 *     responses:
 *       200:
 *         description: Tipo de evento actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: No se encontró el tipo de evento
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoEvento/{id}:
 *   delete:
 *     summary: Eliminar un tipo de evento
 *     tags: [TipoEvento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de evento
 *     responses:
 *       200:
 *         description: Tipo de evento eliminado correctamente
 *       404:
 *         description: No se encontró el tipo de evento
 *       500:
 *         description: Error interno del servidor
 */
