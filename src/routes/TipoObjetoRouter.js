import { Router } from "express";
import {
  SetTipoObjeto,
  UpdateTipoObjeto,
  DeleteTipoObjeto,
  ReadTipoObjeto,
  ReadTipoObjetoEspecifico,
} from "../controllers/TipoObjetoController.js";
import {
  EncontrarTipoObjeto,
  ValidarDatosTiposObjeto,
} from "../middlewares/TipoObjetoMiddleware.js";

const router = Router();

router.post("/", ValidarDatosTiposObjeto, SetTipoObjeto);

router.put(
  "/:id",
  EncontrarTipoObjeto,
  ValidarDatosTiposObjeto,
  UpdateTipoObjeto
);

router.delete("/:id", EncontrarTipoObjeto, DeleteTipoObjeto);

router.get("/", ReadTipoObjeto);

router.get("/:id", EncontrarTipoObjeto, ReadTipoObjetoEspecifico);

export default router;
