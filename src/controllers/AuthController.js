import { RegistrarUsuario, login } from "../service/AuthService.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
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

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await login(username, password);
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "La-palabra-secreta-debe-ser-muy-larga-nunca-corta",
      { expiresIn: "1h" }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .send({ user });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

export const logout = (req, res, next) => {
  res.clearCookie("access_token").json({ message: "Sesion cerrada" });
};

export const render = (req, res, next) => {
  const { user } = req.session;
  res.render("index", user);
};

export const protegida = (req, res, next) => {
  const { user } = req.session;
  if (!user) return res.status(403).send("Acceso no autorizado");
  res.render("protected", user);
};
