import { Router } from "express";
import {
  SetInstrumento,
  UpdateInstrumento,
  DeleteInstrumento,
  ReadInstrumento,
  ReadInstrumentoEspecifico,
} from "../controllers/InstrumentoController.js";
import {
  ValidarDatosInstrumento,
  VerificarExistenciaTipoInstrumento,
  EncontrarInstrumento,
} from "../middlewares/InstrumentoMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  tieneRol("administrador"),
  ValidarDatosInstrumento,
  VerificarExistenciaTipoInstrumento,
  SetInstrumento
);

router.put(
  "/:id",
  verificarTokenRequired,
  ValidarDatosInstrumento,
  VerificarExistenciaTipoInstrumento,
  EncontrarInstrumento,
  tieneRol("administrador"),
  UpdateInstrumento
);

router.delete(
  "/:id",
  verificarTokenRequired,
  EncontrarInstrumento,
  tieneRol("administrador"),
  DeleteInstrumento
);

router.get("/", verificarTokenOpcional, ReadInstrumento);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarInstrumento,
  ReadInstrumentoEspecifico
);

export default router;
