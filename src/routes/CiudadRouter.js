import { Router } from "express";
import {
  SetCiudad,
  UpdateCiudad,
  DeleteCiudad,
  ReadCiudadEspecifico,
  ReadCiudades,
} from "../controllers/CiudadController.js";
import {
  ValidarDatosCiudad,
  VerificarExistenciaProvincia,
  EncontrarCiudad,
} from "../middlewares/CiudadMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  ValidarDatosCiudad,
  VerificarExistenciaProvincia,
  SetCiudad
);

router.put(
  "/:id",
  verificarTokenRequired,
  EncontrarCiudad,
  tieneRol("administrador"),
  ValidarDatosCiudad,
  VerificarExistenciaProvincia,
  UpdateCiudad
);

router.delete(
  "/:id",
  verificarTokenRequired,
  EncontrarCiudad,
  tieneRol("administrador"),
  DeleteCiudad
);

router.get("/", verificarTokenOpcional, ReadCiudades);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarCiudad,
  ReadCiudadEspecifico
);

export default router;
