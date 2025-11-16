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
  verifyOptionalToken,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verifyRequiredToken,
  tieneRol("administrador"),
  validatePublicationTypeData,
  createPublicationTypeHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findPublicationType,
  validatePublicationTypeData,
  updatePublicationTypeHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findPublicationType,
  deletePublicationTypeHandler
);

router.get(
  "/",
  verifyOptionalToken,
  validarPageSize,
  getPublicationTypesHandler
);

router.get(
  "/:id",
  verifyOptionalToken,
  findPublicationType,
  getPublicationTypeHandler
);

export default router;
