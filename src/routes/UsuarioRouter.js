import { Router } from "express";
import {
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUsersHandler,
  getUserHandler,
  addUserInstrumentHandler,
  removeUserInstrumentHandler,
  getUserInstrumentsHandler,
  getUserInstrumentHandler,
} from "../controllers/UsuarioController.js";
import {
  validateUserData,
  validateAttachmentExists,
  validateCityExists,
  findUser,
  findInstrument,
  findUserInstrument,
  validateOptionalUserData,
} from "../middlewares/UsuarioMiddleware.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
  verifyUserOwnership,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verifyRequiredToken,
  validateUserData,
  validateOptionalUserData,
  validateAttachmentExists,
  validateCityExists,
  createUserHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findUser,
  verifyUserOwnership,
  validateUserData,
  validateOptionalUserData,
  validateAttachmentExists,
  validateCityExists,
  updateUserHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findUser,
  verifyUserOwnership,
  deleteUserHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getUsersHandler);

router.get("/:id", verifyOptionalToken, findUser, getUserHandler);

router.post(
  "/:id/instrumentos/:idInstrumento",
  verifyRequiredToken,
  findUser,
  verifyUserOwnership,
  findInstrument,
  addUserInstrumentHandler
);

router.delete(
  "/:id/instrumentos/:idInstrumento",
  verifyRequiredToken,
  findUser,
  verifyUserOwnership,
  findInstrument,
  removeUserInstrumentHandler
);

router.get(
  "/:id/instrumentos",
  verifyOptionalToken,
  findUser,
  getUserInstrumentsHandler
);

router.get(
  "/:id/instrumentos/:idInstrumento",
  verifyOptionalToken,
  findUser,
  findUserInstrument,
  getUserInstrumentHandler
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Crear usuario (requiere token)
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - nombre
 *               - email
 *               - password
 *               - idCiudad
 *               - rol
 *             properties:
 *               username:
 *                 type: string
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               numero:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [administrador, moderador, astronomo, aficionado]
 *               idCiudad:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuario creado
 */

/**
 * @swagger
 * /usuario/{id}:
 *   put:
 *     summary: Actualizar usuario propio
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */

/**
 * @swagger
 * /usuario/{id}:
 *   delete:
 *     summary: Eliminar usuario propio
 *     tags: [Usuario]
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Listar usuarios con paginación
 *     tags: [Usuario]
 */

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuario]
 */

/**
 * @swagger
 * /usuario/{id}/instrumentos/{idInstrumento}:
 *   post:
 *     summary: Agregar instrumento a usuario
 *     tags: [Usuario]
 */

/**
 * @swagger
 * /usuario/{id}/instrumentos/{idInstrumento}:
 *   delete:
 *     summary: Quitar instrumento a usuario
 *     tags: [Usuario]
 */

/**
 * @swagger
 * /usuario/{id}/instrumentos:
 *   get:
 *     summary: Obtener todos los instrumentos del usuario
 *     tags: [Usuario]
 */

/**
 * @swagger
 * /usuario/{id}/instrumentos/{idInstrumento}:
 *   get:
 *     summary: Obtener instrumento específico del usuario
 *     tags: [Usuario]
 */
