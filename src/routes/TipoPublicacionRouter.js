import { Router } from "express";
import {
  createPublicationTypeHandler,
  updatePublicationTypeHandler,
  getPublicationTypesHandler,
  getPublicationTypeHandler,
  deletePublicationTypeHandler,
} from "../controllers/TipoPublicacioController.js";
import {
  findPublicationType,
  validatePublicationTypeData,
} from "../middlewares/TipoPublicacionMiddleware.js";
import { tieneRol } from "../middlewares/RoleUser.js";
import {
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  tieneRol("administrador"),
  validatePublicationTypeData,
  createPublicationTypeHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findPublicationType,
  validatePublicationTypeData,
  updatePublicationTypeHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findPublicationType,
  deletePublicationTypeHandler
);

router.get(
  "/",
  verificarTokenOpcional,
  validarPageSize,
  getPublicationTypesHandler
);

router.get(
  "/:id",
  verificarTokenOpcional,
  findPublicationType,
  getPublicationTypeHandler
);

export default router;
