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
  verifyOptionalToken,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verifyRequiredToken,
  tieneRol("administrador"),
  validateInstrumentData,
  validateInstrumentTypeExists,
  createInstrumentHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  validateInstrumentData,
  validateInstrumentTypeExists,
  findInstrument,
  tieneRol("administrador"),
  updateInstrumentHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findInstrument,
  tieneRol("administrador"),
  deleteInstrumentHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getInstrumentsHandler);

router.get("/:id", verifyOptionalToken, findInstrument, getInstrumentHandler);

export default router;
