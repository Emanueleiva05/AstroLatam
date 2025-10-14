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
import { esAdministrador } from "../utils/RoleUser.js";

const router = Router();

router.post("/", esAdministrador, ValidarDatosTiposEvento, SetTipoEvento);

router.put(
  "/:id",
  esAdministrador,
  EncontrarTipoEvento,
  ValidarDatosTiposEvento,
  UpdateTipoEvento
);

router.delete("/:id", esAdministrador, EncontrarTipoEvento, DeleteTipoEvento);

router.get("/", ReadTiposEvento);

router.get("/:id", EncontrarTipoEvento, ReadTipoEvento);

export default router;
