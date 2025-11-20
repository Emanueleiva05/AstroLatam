import AppError from "../utils/AppError.js";
import { getUserInstrumentById } from "../service/UsuarioService.js";
import { getAttachmentById } from "../service/AdjuntoService.js";
import { getCityById } from "../service/CiudadService.js";
import { getInstrumentById } from "../service/InstrumentoService.js";
import Usuario from "../models/Usuario.js";

export const validateUserData = (req, res, next) => {
  const { nombre, username, email, password, rol, idCiudad } = req.body;
  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no válido para el usuario", 400);
  }

  if (!username || username.trim() === "") {
    throw new AppError("Username no válido para el usuario", 400);
  }

  if (!password || password.trim() === "") {
    throw new AppError("Password no válida para el usuario", 400);
  }
  if (!email || email.trim() === "") {
    throw new AppError("Email no válida para el usuario", 400);
  }

  if (!idCiudad || isNaN(Number(idCiudad))) {
    throw new AppError("idCiudad no válido", 400);
  }

  if (
    !rol ||
    !["administrador", "moderador", "astronomo", "aficionado"].includes(rol)
  ) {
    throw new AppError("Rol no válido", 400);
  }

  next();
};

export const validateOptionalUserData = async (req, res, next) => {
  try {
    const { idAdjunto, descripcion, numero } = req.body;

    if (idAdjunto !== undefined && isNaN(Number(idAdjunto))) {
      throw new AppError("idAdjunto no válido", 400);
    }

    if (descripcion !== undefined && descripcion.trim() === "") {
      throw new AppError("Descripción no válida para el usuario", 400);
    }

    if (numero !== undefined && numero.trim() === "") {
      throw new AppError("Numero no válida para el usuario", 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateAttachmentExists = async (req, res, next) => {
  try {
    const { idAdjunto } = req.body;

    if (!idAdjunto) {
      return next();
    }

    const adjunto = await getAttachmentById(idAdjunto);

    if (!adjunto) {
      throw new AppError("No se encontró el adjunto especificado", 404);
    }

    if (
      !adjunto.link_archivo.endsWith("png") &&
      !adjunto.link_archivo.endsWith("jpg")
    ) {
      throw new AppError("El tipo de adjunto no es valido", 400);
    }

    req.adjunto = adjunto;
    next();
  } catch (error) {
    next(error);
  }
};

export const validateCityExists = async (req, res, next) => {
  try {
    const { idCiudad } = req.body;
    const ciudad = await getCityById(idCiudad);
    if (!ciudad) {
      throw new AppError("No se encontró la ciudad especificado", 404);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const findUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new AppError("No se encontró el usuario especificado", 404);
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    next(error);
  }
};

export const findInstrument = async (req, res, next) => {
  try {
    const { idInstrumento } = req.params;
    const instrumento = await getInstrumentById(idInstrumento);
    if (!instrumento) {
      throw new AppError("No se encontró el instrumento especificado", 404);
    }
    req.instrumento = instrumento;
    next();
  } catch (error) {
    next(error);
  }
};

export const findUserInstrument = async (req, res, next) => {
  try {
    const instrumento = await getUserInstrumentById(
      req.usuario,
      req.params.idInstrumento
    );
    if (instrumento.length === 0) {
      throw new AppError("No se encontro el instrumento del usuario");
    }
    req.instrumento = instrumento[0];
    next();
  } catch (error) {
    next(error);
  }
};
