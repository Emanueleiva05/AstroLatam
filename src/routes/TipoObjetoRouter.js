import { Router } from "express";
import {
  createObjectTypeHandler,
  updateObjectTypeHandler,
  deleteObjectTypeHandler,
  getObjectTypesHandler,
  getObjectTypeHandler,
} from "../controllers/TipoObjetoController.js";
import {
  findObjectType,
  validateObjectTypeData,
} from "../middlewares/TipoObjetoMiddleware.js";
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
  validateObjectTypeData,
  createObjectTypeHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findObjectType,
  validateObjectTypeData,
  updateObjectTypeHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findObjectType,
  deleteObjectTypeHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getObjectTypesHandler);

router.get("/:id", verifyOptionalToken, findObjectType, getObjectTypeHandler);

export default router;

/**
 * @swagger
 * tags:
 *   name: TipoObjeto
 *   description: Gestión de tipos de objeto
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TipoObjeto:
 *       type: object
 *       properties:
 *         idTipoObjeto:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Venus"
 *         descripcion:
 *          type: string
 *          example: "Es un planeta"
 *       required:
 *         - nombre
 *         - descripcion
 */

/**
 * @swagger
 * /tipoObjeto:
 *   get:
 *     summary: Obtener todos los tipos de objetos
 *     tags: [TipoObjeto]
 *     responses:
 *       200:
 *         description: Lista de tipos de objetos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/TipoObjeto"
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoObjeto/{id}:
 *   get:
 *     summary: Obtener un tipo de objeto por ID
 *     tags: [TipoObjeto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de objeto
 *     responses:
 *       200:
 *         description: Tipo de objeto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoObjeto"
 *       404:
 *         description: No se encontró el tipo de objeto
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoObjeto:
 *   post:
 *     summary: Crear un nuevo tipo de objeto
 *     tags: [TipoObjeto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoObjeto"
 *     responses:
 *       201:
 *         description: Tipo de objeto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoObjeto"
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoObjeto/{id}:
 *   put:
 *     summary: Actualizar un tipo de objeto existente
 *     tags: [TipoObjeto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de objeto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoObjeto"
 *     responses:
 *       200:
 *         description: Tipo de objeto actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: No se encontró el tipo de objeto
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoObjeto/{id}:
 *   delete:
 *     summary: Eliminar un tipo de evento
 *     tags: [TipoObjeto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de objeto
 *     responses:
 *       200:
 *         description: Tipo de objeto eliminado correctamente
 *       404:
 *         description: No se encontró el tipo de objeto
 *       500:
 *         description: Error interno del servidor
 */
