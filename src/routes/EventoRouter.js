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

export default router;
