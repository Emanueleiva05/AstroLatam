import { AppError } from "../utils/AppError.js";
import { ListarTipoInstrumentoEspecifico } from "../service/TipoInstrumentoService.js";

export const ValidarDatosTiposInstrumento = (req, res, next) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el tipo instrumento", 400);
  }

  if (!descripcion) {
    throw new AppError("Descripcion no valido para el tipo instrumento", 400);
  }

  next();
};

export const EncontrarTipoInstrumento = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tipoInstrumento = await ListarTipoInstrumentoEspecifico(id);

    if (!tipoInstrumento) {
      throw new AppError("No se encontro el tipoInstrumento especifico", 404);
    }

    req.tipoInstrumento = tipoInstrumento;

    next();
  } catch (error) {
    next(error);
  }
};
