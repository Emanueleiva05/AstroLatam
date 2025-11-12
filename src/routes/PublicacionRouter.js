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
import {
  verificarTokenOpcional,
  verificarTokenRequired,
  verificarUsuario,
} from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post(
  "/",
  ValidarDatosPublicacion,
  VerificarExistenciaTipoPublicacion,
  SetPublicacion
);

router.put(
  "/:id",
  verificarTokenRequired,
  EncontrarPublicacion,
  verificarUsuario,
  UpdatePublicacion
);

router.delete(
  "/:id",
  verificarTokenRequired,
  EncontrarPublicacion,
  verificarUsuario,
  DeletePublicacion
);

router.get("/", verificarTokenOpcional, ReadPublicacion);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarPublicacion,
  ReadPublicacionEspecifico
);

router.put(
  "/visibilidad/:id",
  verificarTokenRequired,
  EncontrarPublicacion,
  verificarUsuario,
  VerificarVisibilidad,
  ChangeVisibilidad
);

export default router;
