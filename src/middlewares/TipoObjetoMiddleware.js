import { AppError } from "../utils/AppError.js";
import { ListarTipoObjetoEspecifico } from "../service/TipoObjetoService.js";

export const ValidarDatosTiposObjeto = (req, res, next) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el tipo objeto", 400);
  }

  if (!descripcion) {
    throw new AppError("Descripcion no valido para el tipo objeto", 400);
  }

  next();
};

export const EncontrarTipoObjeto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tipoObjeto = await ListarTipoObjetoEspecifico(id);

    if (!tipoObjeto) {
      throw new AppError("No se encontro el tipoObjeto especifico", 404);
    }

    req.tipoObjeto = tipoObjeto;

    next();
  } catch (error) {
    next(error);
  }
};
