import {
  deleteUser,
  updateUser,
  getUsers,
  addUserInstrument,
  removeUserInstrument,
  getUserInstruments,
} from "../service/UsuarioService.js";
import { registerUser } from "../service/AuthService.js";

export const createUserHandler = async (req, res, next) => {
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
    await registerUser(
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

export const updateUserHandler = async (req, res, next) => {
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
    await updateUser(
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

export const deleteUserHandler = async (req, res, next) => {
  const usuario = req.usuario;
  try {
    await deleteUser(usuario);
    res.status(204).json({ message: "Usuario eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const getUsersHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const usuarios = await getUsers(page, size);
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
};

export const getUserHandler = async (req, res, next) => {
  const usuario = req.usuario;
  try {
    const usu = usuario;
    res.status(200).json(usu);
  } catch (error) {
    next(error);
  }
};

export const addUserInstrumentHandler = async (req, res, next) => {
  try {
    await addUserInstrument(req.usuario, req.instrumento);
    res.status(201).json({ message: "Se agrego el instrumento con exito" });
  } catch (error) {
    next(error);
  }
};

export const removeUserInstrumentHandler = async (req, res, next) => {
  try {
    await removeUserInstrument(req.usuario, req.instrumento);
    res.status(204).json({ message: "Se elimino el instrumento con exito" });
  } catch (error) {
    next(error);
  }
};

export const getUserInstrumentsHandler = async (req, res, next) => {
  try {
    const instrumentos = await getUserInstruments(req.usuario);
    res.status(200).json(instrumentos);
  } catch (error) {
    next(error);
  }
};

export const getUserInstrumentHandler = async (req, res, next) => {
  try {
    res.status(200).json(req.instrumento);
  } catch (error) {
    next(error);
  }
};
