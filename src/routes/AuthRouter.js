import { Router } from "express";
import {
  registerHandler,
  renderProfileHandler,
  loginHandler,
  logoutHandler,
  protectedRouteHandler,
} from "../controllers/AuthController.js";
import {
  verifyOptionalToken,
  validateAuthData,
  verifyRequiredToken,
} from "../middlewares/AuthMiddleware.js";
import {
  validateUserData,
  validateOptionalUserData,
} from "../middlewares/UsuarioMiddleware.js";

const router = Router();

router.get("/", renderProfileHandler);
router.post("/login", validateAuthData, verifyOptionalToken, loginHandler);
router.post(
  "/register",
  verifyOptionalToken,
  validateUserData,
  validateOptionalUserData,
  registerHandler
);
router.post("/logout", verifyRequiredToken, logoutHandler);
router.get("/protected", verifyRequiredToken, protectedRouteHandler);

export default router;
