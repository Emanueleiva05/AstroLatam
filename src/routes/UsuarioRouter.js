import { Router } from "express";
import {
  SetUsuario,
  UpdateUsuario,
  DeleteUsuario,
  ReadUsuario,
  ReadUsuarioEspecifico,
  SetInstrumento,
  DeleteInstrumento,
} from "../controllers/UsuarioController.js";
import {
  ValidarDatosUsuario,
  VerificarExistenciaAdjunto,
  VerificarExistenciaCiudad,
  EncontrarUsuario,
  EncontrarInstrumento,
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

export default router;
