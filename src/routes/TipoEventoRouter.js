import { Router } from "express";
import {
  SetTipoEvento,
  DeleteTipoEvento,
  UpdateTipoEvento,
  ReadTipoEvento,
  ReadTiposEvento,
} from "../controllers/TipoEventoController.js";
import {
  ValidarDatosTiposEvento,
  EncontrarTipoEvento,
} from "../middlewares/TipoEventoMiddleware.js";

const router = Router();

router.post("/", ValidarDatosTiposEvento, SetTipoEvento);

router.put(
  "/:id",
  EncontrarTipoEvento,
  ValidarDatosTiposEvento,
  UpdateTipoEvento
);

router.delete("/:id", EncontrarTipoEvento, DeleteTipoEvento);

router.get("/", ReadTiposEvento);

router.get("/:id", EncontrarTipoEvento, ReadTipoEvento);

export default router;
