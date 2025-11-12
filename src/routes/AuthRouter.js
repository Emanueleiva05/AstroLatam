import { Router } from "express";
import {
  register,
  render,
  loginUser,
  logout,
  protegida,
} from "../controllers/AuthController.js";
import {
  verificarTokenOpcional,
  validarDatos,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import {
  ValidarDatosUsuario,
  ValidarDatosOpcionalesUsuario,
} from "../middlewares/UsuarioMiddleware.js";

const router = Router();

router.get("/", render);
router.post("/login", validarDatos, verificarTokenOpcional, loginUser);
router.post(
  "/register",
  verificarTokenOpcional,
  ValidarDatosUsuario,
  ValidarDatosOpcionalesUsuario,
  register
);
router.post("/logout", verificarTokenRequired, logout);
router.get("/protected", verificarTokenRequired, protegida);

export default router;
