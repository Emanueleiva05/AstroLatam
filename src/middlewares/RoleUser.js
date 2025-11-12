import AppError from "../utils/AppError.js";

export const tieneRol = (...roles) => {
  return (req, res, next) => {
    const usuario = req.user;
    if (!usuario) throw new AppError("No autenticado", 401);

    const { rol } = usuario;
    if (!roles.includes(rol)) {
      throw new AppError(`No autorizado para rol: ${rol}`, 403);
    }

    next();
  };
};
