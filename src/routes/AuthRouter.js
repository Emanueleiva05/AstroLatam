import { Router } from "express";
import {
  registerHandler,
  renderProfileHandler,
  loginHandler,
  logoutHandler,
  protectedRouteHandler,
} from "../controllers/AuthController.js";
import {
  verifyOptionalToken,
  validateAuthData,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import {
  validateUserData,
  validateOptionalUserData,
} from "../middlewares/UsuarioMiddleware.js";

const router = Router();

router.get("/", renderProfileHandler);
router.post("/login", validateAuthData, verifyOptionalToken, loginHandler);
router.post(
  "/register",
  verifyOptionalToken,
  validateUserData,
  validateOptionalUserData,
  registerHandler
);
router.post("/logout", verifyRequiredToken, logoutHandler);
router.get("/protected", verifyRequiredToken, protectedRouteHandler);

export default router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Ema07"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Sesión iniciada correctamente
 *       401:
 *         description: Usuario o contraseña incorrectos
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
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
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Datos inválidos
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */

/**
 * @swagger
 * /auth/protected:
 *   get:
 *     summary: Ruta protegida para probar JWT
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Acceso autorizado
 *       403:
 *         description: Token inválido o ausente
 */
