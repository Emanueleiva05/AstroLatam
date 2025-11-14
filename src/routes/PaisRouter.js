import { Router } from "express";
import {
  SetPais,
  UpdatePais,
  DeletePais,
  ReadPaisEspecifico,
  ReadPaises,
} from "../controllers/PaisController.js";
import {
  ValidarDatosPais,
  EncontrarPais,
} from "../middlewares/PaisMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post("/", ValidarDatosPais, SetPais);

router.put(
  "/:id",
  verificarTokenRequired,
  EncontrarPais,
  tieneRol("administrador"),
  ValidarDatosPais,
  UpdatePais
);

router.delete(
  "/:id",
  verificarTokenRequired,
  EncontrarPais,
  tieneRol("administrador"),
  DeletePais
);

router.get("/", verificarTokenOpcional, validarPageSize, ReadPaises);

router.get("/:id", verificarTokenOpcional, EncontrarPais, ReadPaisEspecifico);

export default router;
