import { registerUser, loginUser } from "../service/AuthService.js";
import jwt from "jsonwebtoken";

export const registerHandler = async (req, res, next) => {
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

export const loginHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await loginUser(username, password);
    const token = jwt.sign(
      { id: user.idUsuario, username: user.username, rol: user.rol },
      "La-palabra-secreta-debe-ser-muy-larga-nunca-corta",
      { expiresIn: "24h" }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .send({ user, token });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

export const logoutHandler = (req, res, next) => {
  res.clearCookie("access_token").json({ message: "Sesion cerrada" });
};

export const renderProfileHandler = (req, res, next) => {
  const { user } = req.user;
  res.render("index", user);
};

export const protectedRouteHandler = (req, res, next) => {
  const { user } = req.user;
  if (!user) return res.status(403).send("Acceso no autorizado");
  res.render("protected", user);
};
