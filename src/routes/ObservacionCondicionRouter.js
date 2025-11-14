import { Router } from "express";
import {
  SetObservacionCondiciones,
  UpdateObservacionCondiciones,
  DeleteObservacionCondiciones,
  ReadObservacionCondiciones,
  ReadObservacionCondicionesEspecifico,
} from "../controllers/ObservacionCondicionController.js";
import {
  EncontrarCondicion,
  ValidarDatosObservacionCondicion,
  VerificarExistenciaObservacion,
  VerificarExistenciaTipoCondicion,
} from "../middlewares/ObservacionCondicionMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  ValidarDatosObservacionCondicion,
  VerificarExistenciaObservacion,
  VerificarExistenciaTipoCondicion,
  SetObservacionCondiciones
);

router.put(
  "/:id",
  EncontrarCondicion,
  ValidarDatosObservacionCondicion,
  VerificarExistenciaObservacion,
  VerificarExistenciaTipoCondicion,
  UpdateObservacionCondiciones
);

router.delete("/:id", EncontrarCondicion, DeleteObservacionCondiciones);

router.get("/", validarPageSize, ReadObservacionCondiciones);

router.get("/:id", EncontrarCondicion, ReadObservacionCondicionesEspecifico);

export default router;
