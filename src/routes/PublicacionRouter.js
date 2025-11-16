import { Router } from "express";
import {
  deletePublicationHandler,
  createPublicationHandler,
  updatePublicationHandler,
  getPublicationsHandler,
  getPublicationHandler,
  updatePublicationVisibilityHandler,
} from "../controllers/PublicacionController.js";
import {
  findPublication,
  validatePublicationData,
  validatePublicationTypeExist,
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
  validatePublicationData,
  validatePublicationTypeExist,
  createPublicationHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  findPublication,
  verificarUsuario,
  updatePublicationHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  findPublication,
  verificarUsuario,
  deletePublicationHandler
);

router.get(
  "/",
  verificarTokenOpcional,
  validarPageSize,
  getPublicationsHandler
);

router.get(
  "/:id",
  verificarTokenOpcional,
  findPublication,
  getPublicationHandler
);

router.put(
  "/visible/:id",
  verificarTokenRequired,
  findPublication,
  verificarUsuario,
  VerificarVisibilidad,
  updatePublicationVisibilityHandler
);

export default router;
