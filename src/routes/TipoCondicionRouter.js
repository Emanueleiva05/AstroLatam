import { Router } from "express";
import {
  SetTipoCondicion,
  DeleteTipoCondicion,
  UpdateTipoCondicion,
  ReadTipoCondicion,
  ReadTiposCondiciones,
} from "../controllers/TipoCondicionController.js";
import {
  ValidarDatosTiposCondicion,
  EncontrarTipoCondicion,
} from "../middlewares/TipoCondicionMiddleware.js";
import { esAdministrador } from "../utils/RoleUser.js";

const router = Router();

router.post("/", esAdministrador, ValidarDatosTiposCondicion, SetTipoCondicion);

router.put(
  "/:id",
  esAdministrador,
  EncontrarTipoCondicion,
  ValidarDatosTiposCondicion,
  UpdateTipoCondicion
);

router.delete(
  "/:id",
  esAdministrador,
  EncontrarTipoCondicion,
  DeleteTipoCondicion
);

router.get("/", ReadTiposCondiciones);

router.get("/:id", EncontrarTipoCondicion, ReadTipoCondicion);

export default router;
