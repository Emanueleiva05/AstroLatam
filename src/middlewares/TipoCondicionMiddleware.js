import { AppError } from "../utils/AppError.js";
import { ListarTipoCondicionEspecifico } from "../service/TipoCondicionService.js";

export const ValidarDatosTiposCondicion = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el tipo condicion", 400);
  }

  next();
};

export const EncontrarTipoCondicion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tipoCondicion = await ListarTipoCondicionEspecifico(id);

    if (!tipoCondicion) {
      throw new AppError("No se encontro el tipoCondicion especifico", 404);
    }

    req.tipoCondicion = tipoCondicion;

    next();
  } catch (error) {
    next(error);
  }
};
