import {
  EliminarUsuario,
  ModificarUsuario,
  ListarUsuario,
  AgregarInstrumento,
  ELiminarInstrumento,
  ListarInstrumentos,
} from "../service/UsuarioService.js";
import { RegistrarUsuario } from "../service/AuthService.js";

export const SetUsuario = async (req, res, next) => {
  const {
    username,
    nombre,
    email,
    password,
    descripcion,
    numero,
    rol,
    idAdjunto,
    idCiudad,
  } = req.body;
  try {
    await RegistrarUsuario(
      username,
      nombre,
      email,
      password,
      descripcion,
      numero,
      rol,
      idAdjunto,
      idCiudad
    );
    res.status(201).json({ message: "Usuario creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateUsuario = async (req, res, next) => {
  const usuario = req.usuario;
  const {
    username,
    nombre,
    email,
    password,
    descripcion,
    numero,
    rol,
    idAdjunto,
    idCiudad,
  } = req.body;

  try {
    await ModificarUsuario(
      usuario,
      username,
      nombre,
      email,
      password,
      descripcion,
      numero,
      rol,
      idAdjunto,
      idCiudad
    );
    res.status(204).json({ message: "Usuario modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteUsuario = async (req, res, next) => {
  const usuario = req.usuario;
  try {
    await EliminarUsuario(usuario);
    res.status(204).json({ message: "Usuario eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadUsuario = async (req, res, next) => {
  try {
    const usuarios = await ListarUsuario();
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
};

export const ReadUsuarioEspecifico = async (req, res, next) => {
  const usuario = req.usuario;
  try {
    const usu = usuario;
    res.status(200).json(usu);
  } catch (error) {
    next(error);
  }
};

export const SetInstrumento = async (req, res, next) => {
  try {
    await AgregarInstrumento(req.usuario, req.instrumento);
    res.status(201).json({ message: "Se agrego el instrumento con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteInstrumento = async (req, res, next) => {
  try {
    await ELiminarInstrumento(req.usuario, req.instrumento);
    res.status(204).json({ message: "Se elimino el instrumento con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadInstrumentos = async (req, res, next) => {
  try {
    const instrumentos = await ListarInstrumentos(req.usuario);
    res.status(200).json(instrumentos);
  } catch (error) {
    next(error);
  }
};

export const ReadInstrumentoEspecifico = async (req, res, next) => {
  try {
    res.status(200).json(req.instrumento);
  } catch (error) {
    next(error);
  }
};
