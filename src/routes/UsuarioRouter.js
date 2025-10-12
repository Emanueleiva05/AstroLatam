import { Router } from "express";
import {
  SetUsuario,
  UpdateUsuario,
  DeleteUsuario,
  ReadUsuario,
  ReadUsuarioEspecifico,
} from "../controllers/UsuarioController.js";
import {
  ValidarDatosUsuario,
  VerificarExistenciaAdjunto,
  VerificarExistenciaCiudad,
  EncontrarUsuario,
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

export default router;
