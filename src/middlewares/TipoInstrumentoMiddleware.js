import AppError from "../utils/AppError.js";
import { getInstrumentTypeById } from "../service/TipoInstrumentoService.js";

export const validateInstrumentTypeData = (req, res, next) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el tipo instrumento", 400);
  }

  if (!descripcion) {
    throw new AppError("Descripcion no valido para el tipo instrumento", 400);
  }

  next();
};

export const findInstrumentType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tipoInstrumento = await getInstrumentTypeById(id);

    if (!tipoInstrumento) {
      throw new AppError("No se encontro el tipoInstrumento especifico", 404);
    }

    req.tipoInstrumento = tipoInstrumento;

    next();
  } catch (error) {
    next(error);
  }
};
