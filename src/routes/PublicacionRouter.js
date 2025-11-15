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
import { validarPageSize } from "../utils/GeneralValidation.js";

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

router.get("/", verificarTokenOpcional, validarPageSize, ReadPublicacion);

router.get(
  "/:id",
  verificarTokenOpcional,
  EncontrarPublicacion,
  ReadPublicacionEspecifico
);

router.put(
  "/visible/:id",
  verificarTokenRequired,
  EncontrarPublicacion,
  verificarUsuario,
  VerificarVisibilidad,
  ChangeVisibilidad
);

export default router;
