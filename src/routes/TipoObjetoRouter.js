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
import { esAdministrador } from "../utils/RoleUser.js";

const router = Router();

router.post("/", esAdministrador, ValidarDatosTiposObjeto, SetTipoObjeto);

router.put(
  "/:id",
  esAdministrador,
  EncontrarTipoObjeto,
  ValidarDatosTiposObjeto,
  UpdateTipoObjeto
);

router.delete("/:id", esAdministrador, EncontrarTipoObjeto, DeleteTipoObjeto);

router.get("/", ReadTipoObjeto);

router.get("/:id", EncontrarTipoObjeto, ReadTipoObjetoEspecifico);

export default router;
