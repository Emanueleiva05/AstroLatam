import Usuario from "../models/Usuario.js";
import { AppError } from "../utils/AppError.js";

export const AgregarUsuario = async (
  username,
  nombre,
  email,
  password,
  descripcion,
  numero,
  idAdjunto,
  idCiudad
) => {
  return await Usuario.create({
    username: username,
    nombre: nombre,
    email: email,
    password: password,
    descripcion: descripcion,
    numero: numero,
    idAdjunto: idAdjunto,
    idCiudad: idCiudad,
  });
};

export const ModificarUsuario = async (
  usuario,
  username,
  nombre,
  email,
  password,
  descripcion,
  numero,
  idAdjunto,
  idCiudad
) => {
  usuario.username = username;
  usuario.nombre = nombre;
  usuario.email = email;
  usuario.password = password;
  usuario.descripcion = descripcion;
  usuario.numero = numero;
  usuario.idAdjunto = idAdjunto;
  usuario.idCiudad = idCiudad;
  return await usuario.save();
};

export const EliminarUsuario = async (usuario) => {
  return await usuario.destroy();
};

export const ListarUsuario = async () => {
  const usuarios = await Usuario.findAll();
  if (usuarios.length === 0) {
    throw new AppError("No se encontraron usuarios creados", 404);
  }
  return await Usuario.findAll();
};

export const ListarUsuarioEspecifico = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    throw new AppError("No se encontro el usuario especifico", 404);
  }
  return usuario;
};
