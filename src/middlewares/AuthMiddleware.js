import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const verifyOptionalToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next();
  try {
    const data = jwt.verify(
      token,
      "La-palabra-secreta-debe-ser-muy-larga-nunca-corta"
    );
    req.user = data;
  } catch (error) {
    throw new AppError("Token invalido o expirado", 403);
  }

  next();
};

export const verifyRequiredToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) throw new AppError("No se proporciono token", 401);
  try {
    const data = jwt.verify(
      token,
      "La-palabra-secreta-debe-ser-muy-larga-nunca-corta"
    );
    req.user = data;
    next();
  } catch (error) {
    throw new AppError("Token invalido", 403);
  }
};

export const validateAuthData = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || username.trim() === "" || username.length < 5) {
    throw new AppError("Username no válido para el usuario", 400);
  }

  if (!password || password.trim() === "" || password.length < 6) {
    throw new AppError("Password no válida para el usuario", 400);
  }

  next();
};

export const verifyUserOwnership = (req, res, next) => {
  const idUsuario =
    req.publicacion?.idUsuario ||
    req.observacion?.idUsuario ||
    req.accion?.idUsuario ||
    req.usuario?.idUsuario;

  if (!idUsuario) throw new AppError("No se encontro el idUsuario", 404);

  if (req.user.id !== idUsuario) {
    throw new AppError("Solo puedes modificar tu contenido", 401);
  }

  next();
};
