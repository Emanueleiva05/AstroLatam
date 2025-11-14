import { Router } from "express";
import {
  SetUsuario,
  UpdateUsuario,
  DeleteUsuario,
  ReadUsuario,
  ReadUsuarioEspecifico,
  SetInstrumento,
  DeleteInstrumento,
  ReadInstrumentos,
  ReadInstrumentoEspecifico,
} from "../controllers/UsuarioController.js";
import {
  ValidarDatosUsuario,
  VerificarExistenciaAdjunto,
  VerificarExistenciaCiudad,
  EncontrarUsuario,
  EncontrarInstrumento,
  EncontrarInstrumentoUsuario,
  ValidarDatosOpcionalesUsuario,
} from "../middlewares/UsuarioMiddleware.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
  verificarUsuario,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  ValidarDatosUsuario,
  ValidarDatosOpcionalesUsuario,
  VerificarExistenciaAdjunto,
  VerificarExistenciaCiudad,
  SetUsuario
);

router.put(
  "/:id",
  verificarTokenRequired,
  EncontrarUsuario,
  verificarUsuario,
  ValidarDatosUsuario,
  ValidarDatosOpcionalesUsuario,
  VerificarExistenciaAdjunto,
  VerificarExistenciaCiudad,
  UpdateUsuario
);

router.delete(
  "/:id",
  verificarTokenRequired,
  EncontrarUsuario,
  verificarUsuario,
  DeleteUsuario
);

router.get("/", verificarTokenOpcional, validarPageSize, ReadUsuario);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarUsuario,
  ReadUsuarioEspecifico
);

router.post(
  "/agregarInstrumento/:id/:idInstrumento",
  verificarTokenRequired,
  EncontrarUsuario,
  verificarUsuario,
  EncontrarInstrumento,
  SetInstrumento
);

router.delete(
  "/eliminarInstrumento/:id/:idInstrumento",
  verificarTokenRequired,
  EncontrarUsuario,
  verificarUsuario,
  EncontrarInstrumento,
  DeleteInstrumento
);

router.get(
  "/listarInstrumentos/:id",
  verificarTokenOpcional,
  EncontrarUsuario,
  ReadInstrumentos
);

router.get(
  "/listarInstrumentosEspecifico/:id/:idInstrumento",
  verificarTokenOpcional,
  EncontrarUsuario,
  EncontrarInstrumentoUsuario,
  ReadInstrumentoEspecifico
);

export default router;
