import { Router } from "express";
import {
  DeleteTipoAdjunto,
  ReadTipoAdjunto,
  ReadTiposAdjuntos,
  SetTipoAdjunto,
  UpdateTipoAdjunto,
} from "../controllers/TipoAdjuntoController.js";
import {
  EncontrarTipoAdjunto,
  ValidarDatosTiposAdjunto,
} from "../middlewares/TipoAdjuntoMiddleware.js";
import { esAdministrador } from "../utils/RoleUser.js";
const router = Router();

router.post("/", esAdministrador, ValidarDatosTiposAdjunto, SetTipoAdjunto);

router.put(
  "/:id",
  esAdministrador,
  EncontrarTipoAdjunto,
  ValidarDatosTiposAdjunto,
  UpdateTipoAdjunto
);

router.delete("/:id", esAdministrador, EncontrarTipoAdjunto, DeleteTipoAdjunto);

router.get("/", ReadTiposAdjuntos);

router.get("/:id", EncontrarTipoAdjunto, ReadTipoAdjunto);

export default router;
