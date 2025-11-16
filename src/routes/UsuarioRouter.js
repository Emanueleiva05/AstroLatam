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
  verificarTokenOpcional,
  verificarTokenRequired,
  verificarUsuario,
} from "../middlewares/AuthMiddleware.js";
import { validarPageSize } from "../utils/GeneralValidation.js";

const router = Router();

router.post(
  "/",
  verificarTokenRequired,
  validateUserData,
  validateOptionalUserData,
  validateAttachmentExists,
  validateCityExists,
  createUserHandler
);

router.put(
  "/:id",
  verificarTokenRequired,
  findUser,
  verificarUsuario,
  validateUserData,
  validateOptionalUserData,
  validateAttachmentExists,
  validateCityExists,
  updateUserHandler
);

router.delete(
  "/:id",
  verificarTokenRequired,
  findUser,
  verificarUsuario,
  deleteUserHandler
);

router.get("/", verificarTokenOpcional, validarPageSize, getUsersHandler);

router.get("/:id", verificarTokenOpcional, findUser, getUserHandler);

router.post(
  "/:id/instrumentos/:idInstrumento",
  verificarTokenRequired,
  findUser,
  verificarUsuario,
  findInstrument,
  addUserInstrumentHandler
);

router.delete(
  "/:id/instrumentos/:idInstrumento",
  verificarTokenRequired,
  findUser,
  verificarUsuario,
  findInstrument,
  removeUserInstrumentHandler
);

router.get(
  "/:id/instrumentos",
  verificarTokenOpcional,
  findUser,
  getUserInstrumentsHandler
);

router.get(
  "/:id/instrumentos/:idInstrumento",
  verificarTokenOpcional,
  findUser,
  findUserInstrument,
  getUserInstrumentHandler
);

export default router;
