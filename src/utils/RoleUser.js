import AppError from "./AppError.js";
import { ListarUsuarioEspecifico } from "../service/UsuarioService.js";

export const esAdministrador = async (req, res, next) => {
  try {
    const idUsuario = parseInt(req.body.idUsuario);

    if (isNaN(idUsuario)) {
      throw new AppError("El idUsuario no es válido", 400);
    }

    const usuario = await ListarUsuarioEspecifico(idUsuario);

    if (!usuario) {
      throw new AppError("Usuario no encontrado", 404);
    }

    if (usuario.rol !== "administrador") {
      throw new AppError(
        "El usuario loggeado no es administrador, no tiene capacidad de realizar la accion",
        403
      );
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    next(error);
  }
};
