import { Router } from "express";
import {
  createInstrumentHandler,
  updateInstrumentHandler,
  deleteInstrumentHandler,
  getInstrumentsHandler,
  getInstrumentHandler,
} from "../controllers/InstrumentoController.js";
import {
  validateInstrumentData,
  validateInstrumentTypeExists,
  findInstrument,
} from "../middlewares/InstrumentoMiddleware.js";
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
  validateInstrumentData,
  validateInstrumentTypeExists,
  createInstrumentHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  validateInstrumentData,
  validateInstrumentTypeExists,
  findInstrument,
  tieneRol("administrador"),
  updateInstrumentHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  findInstrument,
  tieneRol("administrador"),
  deleteInstrumentHandler
);

router.get("/", verificarTokenOpcional, validarPageSize, getInstrumentsHandler);

router.get(
  "/:id",
  verificarTokenOpcional,
  findInstrument,
  getInstrumentHandler
);

export default router;
