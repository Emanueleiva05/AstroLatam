import AppError from "../utils/AppError.js";
import { getEventTypeById } from "../service/TipoEventoService.js";

export const validateEventTypeData = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el tipo evento", 400);
  }

  next();
};

export const findEventType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tipoEvento = await getEventTypeById(id);

    if (!tipoEvento) {
      throw new AppError("No se encontro el tipoEvento especifico", 404);
    }

    req.tipoEvento = tipoEvento;

    next();
  } catch (error) {
    next(error);
  }
};
