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
  verifyOptionalToken,
  verifyRequiredToken,
  verifyUserOwnership,
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
  verifyRequiredToken,
  findPublication,
  verifyUserOwnership,
  updatePublicationHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findPublication,
  verifyUserOwnership,
  deletePublicationHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getPublicationsHandler);

router.get("/:id", verifyOptionalToken, findPublication, getPublicationHandler);

router.put(
  "/visible/:id",
  verifyRequiredToken,
  findPublication,
  verifyUserOwnership,
  VerificarVisibilidad,
  updatePublicationVisibilityHandler
);

export default router;
