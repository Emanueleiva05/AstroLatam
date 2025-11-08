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

router.post("/", ValidarDatosCiudad, VerificarExistenciaProvincia, SetCiudad);

router.put(
  "/:id",
  EncontrarCiudad,
  ValidarDatosCiudad,
  VerificarExistenciaProvincia,
  UpdateCiudad
);

router.delete("/:id", EncontrarCiudad, DeleteCiudad);

router.get("/", ReadCiudades);

router.get("/:id", EncontrarCiudad, ReadCiudadEspecifico);

export default router;
