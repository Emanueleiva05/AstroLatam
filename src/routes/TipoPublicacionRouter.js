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

const router = Router();

router.post("/", ValidarDatosTiposPublicacion, SetTipoPublicacion);

router.put(
  "/:id",
  EncontrarTipoPublicacion,
  ValidarDatosTiposPublicacion,
  UpdateTipoPublicacion
);

router.delete("/:id", EncontrarTipoPublicacion, DeleteTipoPublicacion);

router.get("/", ReadTipoPublicacion);

router.get("/:id", EncontrarTipoPublicacion, ReadTipoPublicacionEspecifico);

export default router;
