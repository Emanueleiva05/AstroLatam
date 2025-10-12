import { Router } from "express";
import {
  SetAdjunto,
  DeleteAdjunto,
  UpdateAdjunto,
  ReadAdjuntoEspecifico,
  ReadAdjuntos,
} from "../controllers/AdjuntoController.js";
import {
  ValidarDatosAdjunto,
  VerificarExistenciaTipoAdjunto,
  EncontrarAdjunto,
} from "../middlewares/AdjuntoMiddleware.js";

const router = Router();

router.post(
  "/",
  ValidarDatosAdjunto,
  VerificarExistenciaTipoAdjunto,
  SetAdjunto
);

router.put(
  "/:id",
  EncontrarAdjunto,
  ValidarDatosAdjunto,
  VerificarExistenciaTipoAdjunto,
  UpdateAdjunto
);

router.delete("/:id", EncontrarAdjunto, DeleteAdjunto);

router.get("/", ReadAdjuntos);

router.get("/:id", EncontrarAdjunto, ReadAdjuntoEspecifico);

export default router;
