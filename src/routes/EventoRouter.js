import { Router } from "express";
import {
  SetEvento,
  DeleteEvento,
  UpdateEvento,
  ReadEvento,
  ReadEventoEspecifico,
} from "../controllers/EventoController.js";
import {
  EncontrarEvento,
  ValidarDatosEvento,
  VerificarExistenciaTipoEvento,
} from "../middlewares/EventoMiddleware.js";

const router = Router();

router.post("/", ValidarDatosEvento, VerificarExistenciaTipoEvento, SetEvento);

router.put(
  "/:id",
  EncontrarEvento,
  ValidarDatosEvento,
  VerificarExistenciaTipoEvento,
  UpdateEvento
);

router.delete("/:id", EncontrarEvento, DeleteEvento);

router.get("/", ReadEvento);

router.get("/:id", EncontrarEvento, ReadEventoEspecifico);

export default router;
