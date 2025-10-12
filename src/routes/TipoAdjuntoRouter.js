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

const router = Router();

router.post("/", ValidarDatosTiposAdjunto, SetTipoAdjunto);

router.put(
  "/:id",
  EncontrarTipoAdjunto,
  ValidarDatosTiposAdjunto,
  UpdateTipoAdjunto
);

router.delete("/:id", EncontrarTipoAdjunto, DeleteTipoAdjunto);

router.get("/", ReadTiposAdjuntos);

router.get("/:id", EncontrarTipoAdjunto, ReadTipoAdjunto);

export default router;
