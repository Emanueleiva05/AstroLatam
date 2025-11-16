import { Router } from "express";
import {
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUsersHandler,
  getUserHandler,
  addUserInstrumentHandler,
  removeUserInstrumentHandler,
  getUserInstrumentsHandler,
  getUserInstrumentHandler,
} from "../controllers/UsuarioController.js";
import {
  validateUserData,
  validateAttachmentExists,
  validateCityExists,
  findUser,
  findInstrument,
  findUserInstrument,
  validateOptionalUserData,
} from "../middlewares/UsuarioMiddleware.js";
import {
  verifyOptionalToken,
  verifyRequiredToken,
  verifyUserOwnership,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verifyRequiredToken,
  validateUserData,
  validateOptionalUserData,
  validateAttachmentExists,
  validateCityExists,
  createUserHandler
);

router.put(
  "/:id",
  verifyRequiredToken,
  findUser,
  verifyUserOwnership,
  validateUserData,
  validateOptionalUserData,
  validateAttachmentExists,
  validateCityExists,
  updateUserHandler
);

router.delete(
  "/:id",
  verifyRequiredToken,
  findUser,
  verifyUserOwnership,
  deleteUserHandler
);

router.get("/", verifyOptionalToken, validarPageSize, getUsersHandler);

router.get("/:id", verifyOptionalToken, findUser, getUserHandler);

router.post(
  "/:id/instrumentos/:idInstrumento",
  verifyRequiredToken,
  findUser,
  verifyUserOwnership,
  findInstrument,
  addUserInstrumentHandler
);

router.delete(
  "/:id/instrumentos/:idInstrumento",
  verifyRequiredToken,
  findUser,
  verifyUserOwnership,
  findInstrument,
  removeUserInstrumentHandler
);

router.get(
  "/:id/instrumentos",
  verifyOptionalToken,
  findUser,
  getUserInstrumentsHandler
);

router.get(
  "/:id/instrumentos/:idInstrumento",
  verifyOptionalToken,
  findUser,
  findUserInstrument,
  getUserInstrumentHandler
);

export default router;
