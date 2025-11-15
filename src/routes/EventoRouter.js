import { Router } from "express";
import {
  SetEvento,
  DeleteEvento,
  UpdateEvento,
  ReadEvento,
  ReadEventoEspecifico,
  SetAdjunto,
  RemoveAdjunto,
  SetObjeto,
  RemoveObjeto,
  SetPais,
  RemovePais,
  ReadAdjuntoEspecifico,
  ReadAdjuntos,
  ReadPaises,
  ReadPaisEspecifico,
  ReadObjetos,
  ReadObjetoEspecifico,
} from "../controllers/EventoController.js";
import {
  EncontrarEvento,
  EncontrarAdjunto,
  ValidarDatosEvento,
  VerificarExistenciaTipoEvento,
  EncontrarObjeto,
  EncontrarPais,
  EncontrarAdjuntoEvento,
  EncontrarPaisEvento,
  EncontrarObjetosEvento,
} from "../middlewares/EventoMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  tieneRol("administrador"),
  ValidarDatosEvento,
  VerificarExistenciaTipoEvento,
  SetEvento
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  ValidarDatosEvento,
  VerificarExistenciaTipoEvento,
  UpdateEvento
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  DeleteEvento
);

router.get("/", verificarTokenOpcional, validarPageSize, ReadEvento);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarEvento,
  ReadEventoEspecifico
);

router.post(
  "/:id/adjuntos/:idAdjunto",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarAdjunto,
  SetAdjunto
);

router.delete(
  "/:id/adjuntos/:idAdjunto",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarAdjunto,
  RemoveAdjunto
);

router.post(
  "/:id/paises/:idPais",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarPais,
  SetPais
);

router.delete(
  "/:id/paises/:idPais",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarPais,
  RemovePais
);

router.post(
  "/:id/objetos/:idObjeto",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarObjeto,
  SetObjeto
);

router.delete(
  "/:id/objetos/:idObjeto",
  verificarTokenRequired,
  tieneRol("administrador"),
  EncontrarEvento,
  EncontrarEvento,
  EncontrarObjeto,
  RemoveObjeto
);

router.get(
  "/:id/adjuntos",
  verificarTokenOpcional,
  EncontrarEvento,
  ReadAdjuntos
);

router.get(
  "/:id/adjuntos/:idAdjunto",
  verificarTokenOpcional,
  EncontrarEvento,
  EncontrarAdjuntoEvento,
  ReadAdjuntoEspecifico
);

router.get("/:id/paises", verificarTokenOpcional, EncontrarEvento, ReadPaises);

router.get(
  "/:id/paises/:idPais",
  verificarTokenOpcional,
  EncontrarEvento,
  EncontrarPaisEvento,
  ReadPaisEspecifico
);

router.get(
  "/:id/objetos",
  verificarTokenOpcional,
  EncontrarEvento,
  ReadObjetos
);

router.get(
  "/:id/objetos/:idObjeto",
  verificarTokenOpcional,
  EncontrarEvento,
  EncontrarObjetosEvento,
  ReadObjetoEspecifico
);

export default router;
