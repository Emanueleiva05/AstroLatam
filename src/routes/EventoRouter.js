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
import { esAdministrador } from "../utils/RoleUser.js";

const router = Router();

router.post(
  "/",
  esAdministrador,
  ValidarDatosEvento,
  VerificarExistenciaTipoEvento,
  SetEvento
);

router.put(
  "/:id",
  esAdministrador,
  EncontrarEvento,
  ValidarDatosEvento,
  VerificarExistenciaTipoEvento,
  UpdateEvento
);

router.delete("/:id", esAdministrador, EncontrarEvento, DeleteEvento);

router.get("/", ReadEvento);

router.get("/:id", EncontrarEvento, ReadEventoEspecifico);

router.post(
  "/agregarAdjunto/:id/:idAdjunto",
  EncontrarEvento,
  EncontrarAdjunto,
  SetAdjunto
);

router.delete(
  "/eliminarAdjunto/:id/:idAdjunto",
  EncontrarEvento,
  EncontrarAdjunto,
  RemoveAdjunto
);

router.post(
  "/agregarPais/:id/:idPais",
  EncontrarEvento,
  EncontrarPais,
  SetPais
);

router.delete(
  "/eliminarPais/:id/:idPais",
  EncontrarEvento,
  EncontrarPais,
  RemovePais
);

router.post(
  "/agregarObjeto/:id/:idObjeto",
  EncontrarEvento,
  EncontrarObjeto,
  SetObjeto
);

router.delete(
  "/eliminarObjeto/:id/:idObjeto",
  EncontrarEvento,
  EncontrarObjeto,
  RemoveObjeto
);

router.get("/listarInstrumentos/:id", EncontrarEvento, ReadAdjuntos);

router.get(
  "/listarInstrumentosEspecifico/:id/:idAdjunto",
  EncontrarEvento,
  EncontrarAdjuntoEvento,
  ReadAdjuntoEspecifico
);

router.get("/listarPaises/:id", EncontrarEvento, ReadPaises);

router.get(
  "/listarPaisEspecifico/:id/:idPais",
  EncontrarEvento,
  EncontrarPaisEvento,
  ReadPaisEspecifico
);

router.get("/listarObjetos/:id", EncontrarEvento, ReadObjetos);

router.get(
  "/listarObjetoEspecifico/:id/:idObjeto",
  EncontrarEvento,
  EncontrarObjetosEvento,
  ReadObjetoEspecifico
);

export default router;
