import AppError from "../utils/AppError.js";
import {
  ListarUsuarioEspecifico,
  ListarInstrumentosEspecificoUsuario,
} from "../service/UsuarioService.js";
import { ListarAdjuntoEspecifico } from "../service/AdjuntoService.js";
import { ListarCiudadEspecifico } from "../service/CiudadService.js";
import { ListarInstrumentoEspecifico } from "../service/InstrumentoService.js";

export const ValidarDatosUsuario = (req, res, next) => {
  const {
    nombre,
    username,
    email,
    password,
    descripcion,
    numero,
    rol,
    idAdjunto,
    idCiudad,
  } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no válido para el usuario", 400);
  }

  if (!username || username.trim() === "") {
    throw new AppError("Username no válido para el usuario", 400);
  }

  if (!descripcion || descripcion.trim() === "") {
    throw new AppError("Descripción no válida para el usuario", 400);
  }

  if (!numero || numero.trim() === "") {
    throw new AppError("Numero no válida para el usuario", 400);
  }

  if (!password || password.trim() === "") {
    throw new AppError("Password no válida para el usuario", 400);
  }

  if (!email || email.trim() === "") {
    throw new AppError("Email no válida para el usuario", 400);
  }

  if (!idAdjunto || isNaN(Number(idAdjunto))) {
    throw new AppError("idAdjunto no válido", 400);
  }

  if (!idCiudad || isNaN(Number(idCiudad))) {
    throw new AppError("idCiudad no válido", 400);
  }

  if (
    !rol ||
    ["administrador", "moderador", "astronomo", "aficionado"].includes(rol)
  ) {
    throw new AppError("Rol no válido", 400);
  }

  next();
};

export const VerificarExistenciaAdjunto = async (req, res, next) => {
  try {
    const { idAdjunto } = req.body;
    const adjunto = await ListarAdjuntoEspecifico(idAdjunto);
    if (!adjunto) {
      throw new AppError("No se encontró el adjunto especificado", 404);
    }
    req.adjunto = adjunto;
    next();
  } catch (error) {
    next(error);
  }
};

export const VerificarExistenciaCiudad = async (req, res, next) => {
  try {
    const { idCiudad } = req.body;
    const ciudad = await ListarCiudadEspecifico(idCiudad);
    if (!ciudad) {
      throw new AppError("No se encontró la ciudad especificado", 404);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await ListarUsuarioEspecifico(id);
    if (!usuario) {
      throw new AppError("No se encontró el usuario especificado", 404);
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarInstrumento = async (req, res, next) => {
  try {
    const { idInstrumento } = req.params;
    const instrumento = await ListarInstrumentoEspecifico(idInstrumento);
    if (!instrumento) {
      throw new AppError("No se encontró el instrumento especificado", 404);
    }
    req.instrumento = instrumento;
    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarInstrumentoUsuario = async (req, res, next) => {
  try {
    const instrumento = await ListarInstrumentosEspecificoUsuario(
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
