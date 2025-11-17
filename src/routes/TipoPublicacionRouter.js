import { Router } from "express";
import {
  createPublicationTypeHandler,
  updatePublicationTypeHandler,
  getPublicationTypesHandler,
  getPublicationTypeHandler,
  deletePublicationTypeHandler,
} from "../controllers/TipoPublicacioController.js";
import {
  findPublicationType,
  validatePublicationTypeData,
} from "../middlewares/TipoPublicacionMiddleware.js";
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
  validatePublicationTypeData,
  createPublicationTypeHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findPublicationType,
  validatePublicationTypeData,
  updatePublicationTypeHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findPublicationType,
  deletePublicationTypeHandler
);

router.get(
  "/",
  verifyOptionalToken,
  validarPageSize,
  getPublicationTypesHandler
);

router.get(
  "/:id",
  verifyOptionalToken,
  findPublicationType,
  getPublicationTypeHandler
);

export default router;

/**
 * @swagger
 * tags:
 *   name: TipoPublicacion
 *   description: Gestión de tipos de publicacion
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TipoPublicacion:
 *       type: object
 *       properties:
 *         idTipoPublicacion:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Divulgacion"
 *         descripcion:
 *          type: string
 *          example: "Fisica cuantica para dummies"
 *       required:
 *         - nombre
 *         - descripcion
 */

/**
 * @swagger
 * /tipoPublicacion:
 *   get:
 *     summary: Obtener todos los tipos de publicacion
 *     tags: [TipoPublicacion]
 *     responses:
 *       200:
 *         description: Lista de tipos de publicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/TipoPublicacion"
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoPublicacion/{id}:
 *   get:
 *     summary: Obtener un tipo de publicacion por ID
 *     tags: [TipoPublicacion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de publicacion
 *     responses:
 *       200:
 *         description: Tipo de publicacion obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoPublicacion"
 *       404:
 *         description: No se encontró el tipo de publicacion
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoPublicacion:
 *   post:
 *     summary: Crear un nuevo tipo de publicacion
 *     tags: [TipoPublicacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoPublicacion"
 *     responses:
 *       201:
 *         description: Tipo de publicacion creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TipoPublicacion"
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoPublicacion/{id}:
 *   put:
 *     summary: Actualizar un tipo de publicacion existente
 *     tags: [TipoPublicacion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de publicacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TipoPublicacion"
 *     responses:
 *       200:
 *         description: Tipo de publicacion actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: No se encontró el tipo de publicacion
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /tipoPublicacion/{id}:
 *   delete:
 *     summary: Eliminar un tipo de publicacion
 *     tags: [TipoPublicacion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de publicacion
 *     responses:
 *       200:
 *         description: Tipo de publicacion eliminado correctamente
 *       404:
 *         description: No se encontró el tipo de publicacion
 *       500:
 *         description: Error interno del servidor
 */
