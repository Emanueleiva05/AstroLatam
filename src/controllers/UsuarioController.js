import {
  AgregarUsuario,
  EliminarUsuario,
  ModificarUsuario,
  ListarUsuario,
  AgregarInstrumento,
  ELiminarInstrumento,
} from "../service/UsuarioService.js";

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
    await AgregarUsuario(
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
    res.status(200).json({ message: "Usuario creado con exito" });
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
    res.status(200).json({ message: "Usuario modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteUsuario = async (req, res, next) => {
  const usuario = req.usuario;
  try {
    await EliminarUsuario(usuario);
    res.status(200).json({ message: "Usuario eliminado con exito" });
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
    res.status(200).json({ message: "Se agrego el instrumento con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteInstrumento = async (req, res, next) => {
  try {
    await ELiminarInstrumento(req.usuario, req.instrumento);
    res.status(200).json({ message: "Se elimino el instrumento con exito" });
  } catch (error) {
    next(error);
  }
};
