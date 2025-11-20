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
  getObjectAttachmentHandler,
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
  getObjectAttachmentHandler
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Objeto
 *   description: Gestión de objetos astronómicos registrados por administración
 */

/**
 * @swagger
 * /objeto:
 *   post:
 *     summary: Crear un objeto astronómico
 *     tags: [Objeto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - idTipoObjeto
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               idTipoObjeto:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Objeto creado
 */

/**
 * @swagger
 * /objeto/{id}:
 *   put:
 *     summary: Actualizar un objeto (solo administrador)
 *     tags: [Objeto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Objeto actualizado
 */

/**
 * @swagger
 * /objeto/{id}:
 *   delete:
 *     summary: Eliminar un objeto (solo administrador)
 *     tags: [Objeto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Objeto eliminado
 */

/**
 * @swagger
 * /objeto:
 *   get:
 *     summary: Obtener objetos paginados
 *     tags: [Objeto]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *       - name: size
 *         in: query
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista paginada de objetos
 */

/**
 * @swagger
 * /objeto/{id}:
 *   get:
 *     summary: Obtener un objeto específico
 *     tags: [Objeto]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Objeto encontrado
 */

/**
 * @swagger
 * /objeto/{id}/adjuntos/{idAdjunto}:
 *   post:
 *     summary: Asociar un adjunto a un objeto (solo admin)
 *     tags: [Objeto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *       - name: idAdjunto
 *         in: path
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Adjunto agregado al objeto
 */

/**
 * @swagger
 * /objeto/{id}/adjuntos/{idAdjunto}:
 *   delete:
 *     summary: Remover un adjunto asociado a un objeto (solo admin)
 *     tags: [Objeto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *       - name: idAdjunto
 *         in: path
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Adjunto removido
 */

/**
 * @swagger
 * /objeto/{id}/adjuntos:
 *   get:
 *     summary: Obtener todos los adjuntos asociados a un objeto
 *     tags: [Objeto]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de adjuntos del objeto
 */
