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
  verificarTokenOpcional,
  verificarTokenRequired,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  tieneRol("administrador"),
  validateInstrumentTypeData,
  createInstrumentTypeHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findInstrumentType,
  validateInstrumentTypeData,
  updateInstrumentTypeHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  tieneRol("administrador"),
  findInstrumentType,
  deleteInstrumentTypeHandler
);

router.get(
  "/",
  verificarTokenOpcional,
  validarPageSize,
  getInstrumentTypesHandler
);

router.get(
  "/:id",
  verificarTokenOpcional,
  findInstrumentType,
  getInstrumentTypeHandler
);

export default router;
