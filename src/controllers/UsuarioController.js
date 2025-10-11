import {
  AgregarUsuario,
  EliminarUsuario,
  ModificarUsuario,
  ListarUsuario,
  ListarUsuarioEspecifico,
} from "../service/UsuarioService.js";

export const SetUsuario = async (req, res) => {
  const {
    username,
    nombre,
    email,
    password,
    descripcion,
    numero,
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
      idAdjunto,
      idCiudad
    );
    res.status(200).json({ message: "Usuario creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateUsuario = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    nombre,
    email,
    password,
    descripcion,
    numero,
    idAdjunto,
    idCiudad,
  } = req.body;

  try {
    await ModificarUsuario(
      await ListarUsuarioEspecifico(id),
      username,
      nombre,
      email,
      password,
      descripcion,
      numero,
      idAdjunto,
      idCiudad
    );
    res.status(200).json({ message: "Usuario modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarUsuario(await ListarUsuarioEspecifico(id));
    res.status(200).json({ message: "Usuario eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadUsuario = async (req, res) => {
  try {
    const usuarios = await ListarUsuario();
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
};

export const ReadUsuarioEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await ListarUsuarioEspecifico(id);
    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
};
