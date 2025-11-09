import { Router } from "express";
import {
  SetUbicacion,
  UpdateUbicacion,
  DeleteUbicacion,
  ReadUbicacion,
  ReadUbicacionEspecifico,
} from "../controllers/UbicacionController.js";
import {
  EncontrarUbicacion,
  ValidarDatosUbicacion,
  VerificarExistenciaCiudad,
} from "../middlewares/UbicacionMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
  verificarUsuario,
} from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post(
  "/",
  ValidarDatosUbicacion,
  VerificarExistenciaCiudad,
  SetUbicacion
);

router.put(
  "/:id",
  verificarTokenRequired,
  EncontrarUbicacion,
  verificarUsuario,
  ValidarDatosUbicacion,
  VerificarExistenciaCiudad,
  UpdateUbicacion
);

router.delete(
  "/:id",
  verificarTokenRequired,
  verificarUsuario,
  EncontrarUbicacion,
  DeleteUbicacion
);

router.get("/", verificarTokenOpcional, ReadUbicacion);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarUbicacion,
  ReadUbicacionEspecifico
);

export default router;
