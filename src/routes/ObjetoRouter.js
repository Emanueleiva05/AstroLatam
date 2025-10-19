import { Router } from "express";
import {
  SetObjeto,
  DeleteObjeto,
  UpdateObjeto,
  ReadObjeto,
  ReadObjetoEspecifico,
  SetAdjunto,
  RemoveAdjunto,
  ReadAdjuntos,
} from "../controllers/ObjetoController.js";
import {
  EncontrarObjeto,
  EncontrarAdjunto,
  ValidarDatosObjeto,
  VerificarExistenciaTipoObjeto,
  EncontrarAdjuntoObjeto,
} from "../middlewares/ObjetoMiddleware.js";

const router = Router();

router.post("/", ValidarDatosObjeto, VerificarExistenciaTipoObjeto, SetObjeto);

router.put(
  "/:id",
  EncontrarObjeto,
  ValidarDatosObjeto,
  VerificarExistenciaTipoObjeto,
  UpdateObjeto
);

router.delete("/:id", EncontrarObjeto, DeleteObjeto);

router.get("/", ReadObjeto);

router.get("/:id", EncontrarObjeto, ReadObjetoEspecifico);

router.post(
  "/agregarAdjunto/:id/:idAdjunto",
  EncontrarObjeto,
  EncontrarAdjunto,
  SetAdjunto
);

router.delete(
  "/eliminarAdjunto/:id/:idAdjunto",
  EncontrarObjeto,
  EncontrarAdjunto,
  RemoveAdjunto
);

router.get("/listarAdjuntos/:id", EncontrarObjeto, ReadAdjuntos);

router.get(
  "/listarAdjuntoEspecifico/:id/:idAdjunto",
  EncontrarObjeto,
  EncontrarAdjuntoObjeto,
  ReadObjetoEspecifico
);

export default router;
