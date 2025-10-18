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
} from "../middlewares/UsuarioMiddleware.js";

const router = Router();

router.post(
  "/",
  ValidarDatosUsuario,
  VerificarExistenciaAdjunto,
  VerificarExistenciaCiudad,
  SetUsuario
);

router.put(
  "/:id",
  EncontrarUsuario,
  ValidarDatosUsuario,
  VerificarExistenciaAdjunto,
  VerificarExistenciaCiudad,
  UpdateUsuario
);

router.delete("/:id", EncontrarUsuario, DeleteUsuario);

router.get("/", ReadUsuario);

router.get("/:id", EncontrarUsuario, ReadUsuarioEspecifico);

router.post(
  "/agregarInstrumento/:id/:idInstrumento",
  EncontrarUsuario,
  EncontrarInstrumento,
  SetInstrumento
);

router.delete(
  "/eliminarInstrumento/:id/:idInstrumento",
  EncontrarInstrumento,
  EncontrarUsuario,
  DeleteInstrumento
);

router.get("/listarInstrumentos/:id", EncontrarUsuario, ReadInstrumentos);

router.get(
  "/listarInstrumentosEspecifico/:id/:idInstrumento",
  EncontrarUsuario,
  EncontrarInstrumentoUsuario,
  ReadInstrumentoEspecifico
);

export default router;
