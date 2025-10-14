import { Router } from "express";
import {
  SetTipoPublicacion,
  UpdateTipoPublicacion,
  ReadTipoPublicacion,
  ReadTipoPublicacionEspecifico,
  DeleteTipoPublicacion,
} from "../controllers/TipoPublicacioController.js";
import {
  EncontrarTipoPublicacion,
  ValidarDatosTiposPublicacion,
} from "../middlewares/TipoPublicacionMiddleware.js";
import { esAdministrador } from "../utils/RoleUser.js";

const router = Router();

router.post(
  "/",
  esAdministrador,
  ValidarDatosTiposPublicacion,
  SetTipoPublicacion
);

router.put(
  "/:id",
  esAdministrador,
  EncontrarTipoPublicacion,
  ValidarDatosTiposPublicacion,
  UpdateTipoPublicacion
);

router.delete(
  "/:id",
  esAdministrador,
  EncontrarTipoPublicacion,
  DeleteTipoPublicacion
);

router.get("/", ReadTipoPublicacion);

router.get("/:id", EncontrarTipoPublicacion, ReadTipoPublicacionEspecifico);

export default router;
