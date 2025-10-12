import { Router } from "express";
import {
  SetObjeto,
  DeleteObjeto,
  UpdateObjeto,
  ReadObjeto,
  ReadObjetoEspecifico,
} from "../controllers/ObjetoController.js";
import {
  EncontrarObjeto,
  ValidarDatosObjeto,
  VerificarExistenciaTipoObjeto,
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

export default router;
