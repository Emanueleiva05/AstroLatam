import bcrypt from "bcrypt";
import Usuario from "../models/Usuario.js";
import { getUserByUsername } from "../service/UsuarioService.js";
import AppError from "../utils/AppError.js";

export const registerUser = async (
  username,
  nombre,
  email,
  password,
  descripcion,
  numero,
  rol,
  idAdjunto,
  idCiudad
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await Usuario.create({
    username,
    nombre,
    email,
    password: hashedPassword,
    descripcion,
    numero,
    rol,
    idAdjunto,
    idCiudad,
  });
};

export const loginUser = async (username, password) => {
  const user = await getUserByUsername(username);
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new AppError("Contrasena no valida");

  const { password: _, ...publicUser } = user;
  return publicUser;
};
