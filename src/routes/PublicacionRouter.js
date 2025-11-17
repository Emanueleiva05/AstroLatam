import { Router } from "express";
import {
  deletePublicationHandler,
  createPublicationHandler,
  updatePublicationHandler,
  getPublicationsHandler,
  getPublicationHandler,
  updatePublicationVisibilityHandler,
} from "../controllers/PublicacionController.js";
import {
  findPublication,
  validatePublicationData,
  validatePublicationTypeExist,
} from "../middlewares/PublicacionMiddleware.js";
import { VerificarVisibilidad } from "../utils/GeneralValidation.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
  verifyUserOwnership,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  validatePublicationData,
  validatePublicationTypeExist,
  createPublicationHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findPublication,
  verifyUserOwnership,
  updatePublicationHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findPublication,
  verifyUserOwnership,
  deletePublicationHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getPublicationsHandler);

router.get("/:id", verifyOptionalToken, findPublication, getPublicationHandler);

router.put(
  "/visible/:id",
  verifyRequiredToken,
  findPublication,
  verifyUserOwnership,
  VerificarVisibilidad,
  updatePublicationVisibilityHandler
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Publicacion
 *   description: Gestión de publicaciones de los usuarios
 */

/**
 * @swagger
 * /publicacion:
 *   post:
 *     summary: Crear una publicación
 *     tags: [Publicacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - idTipoPublicacion
 *               - idUsuario
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               idTipoPublicacion:
 *                 type: integer
 *               idUsuario:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Publicación creada
 */

/**
 * @swagger
 * /publicacion/{id}:
 *   put:
 *     summary: Modificar una publicación propia
 *     tags: [Publicacion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publicación actualizada
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /publicacion/{id}:
 *   delete:
 *     summary: Eliminar una publicación propia
 *     tags: [Publicacion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publicación eliminada
 */

/**
 * @swagger
 * /publicacion:
 *   get:
 *     summary: Obtener publicaciones paginadas
 *     tags: [Publicacion]
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
 *         description: Lista paginada
 */

/**
 * @swagger
 * /publicacion/{id}:
 *   get:
 *     summary: Obtener una publicación específica
 *     tags: [Publicacion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Publicación encontrada
 */

/**
 * @swagger
 * /publicacion/visible/{id}:
 *   put:
 *     summary: Actualizar visibilidad de una publicación
 *     tags: [Publicacion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visibilidad actualizada
 */
