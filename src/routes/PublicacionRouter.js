import { Router } from "express";
import {
  DeletePublicacion,
  SetPublicacion,
  UpdatePublicacion,
  ReadPublicacion,
  ReadPublicacionEspecifico,
  ChangeVisibilidad,
} from "../controllers/PublicacionController.js";
import {
  EncontrarPublicacion,
  ValidarDatosPublicacion,
  VerificarExistenciaTipoPublicacion,
} from "../middlewares/PublicacionMiddleware.js";
import { VerificarVisibilidad } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  ValidarDatosPublicacion,
  VerificarExistenciaTipoPublicacion,
  SetPublicacion
);

router.put(
  "/:id",
  EncontrarPublicacion,
  ValidarDatosPublicacion,
  VerificarExistenciaTipoPublicacion,
  UpdatePublicacion
);

router.delete("/:id", EncontrarPublicacion, DeletePublicacion);

router.get("/", ReadPublicacion);

router.get("/:id", EncontrarPublicacion, ReadPublicacionEspecifico);

router.put(
  "/visibilidad/:id",
  EncontrarPublicacion,
  VerificarVisibilidad,
  ChangeVisibilidad
);

export default router;
