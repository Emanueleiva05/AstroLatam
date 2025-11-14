import { Router } from "express";
import {
  SetProvincia,
  UpdateProvincia,
  DeleteProvincia,
  ReadProvinciaEspecifico,
  ReadProvincias,
} from "../controllers/ProvinciaController.js";

import {
  EncontrarProvincia,
  ValidarDatosProvincia,
  VerificarExistenciaPais,
} from "../middlewares/ProvinciaMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post("/", ValidarDatosProvincia, VerificarExistenciaPais, SetProvincia);

router.put(
  "/:id",
  verificarTokenRequired,
  EncontrarProvincia,
  tieneRol("administrador"),
  ValidarDatosProvincia,
  VerificarExistenciaPais,
  UpdateProvincia
);

router.delete(
  "/:id",
  verificarTokenRequired,
  EncontrarProvincia,
  tieneRol("administrador"),
  DeleteProvincia
);

router.get("/", verificarTokenOpcional, validarPageSize, ReadProvincias);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarProvincia,
  ReadProvinciaEspecifico
);

export default router;
