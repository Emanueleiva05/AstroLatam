import { Router } from "express";
import {
  createInstrumentTypeHandler,
  deleteInstrumentTypeHandler,
  updateInstrumentTypeHandler,
  getInstrumentTypesHandler,
  getInstrumentTypeHandler,
} from "../controllers/TipoInstrumentoController.js";
import {
  findInstrumentType,
  validateInstrumentTypeData,
} from "../middlewares/TipoInstrumentoMiddleware.js";
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
  validateInstrumentTypeData,
  createInstrumentTypeHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findInstrumentType,
  validateInstrumentTypeData,
  updateInstrumentTypeHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  tieneRol("administrador"),
  findInstrumentType,
  deleteInstrumentTypeHandler
);

router.get(
  "/",
  verifyOptionalToken,
  validarPageSize,
  getInstrumentTypesHandler
);

router.get(
  "/:id",
  verifyOptionalToken,
  findInstrumentType,
  getInstrumentTypeHandler
);

export default router;
