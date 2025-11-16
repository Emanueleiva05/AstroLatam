import AppError from "../utils/AppError.js";
import { getConditionTypeById } from "../service/TipoCondicionService.js";

export const validateConditionTypeData = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el tipo condicion", 400);
  }

  next();
};

export const findConditionType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tipoCondicion = await getConditionTypeById(id);

    if (!tipoCondicion) {
      throw new AppError("No se encontro el tipoCondicion especifico", 404);
    }

    req.tipoCondicion = tipoCondicion;

    next();
  } catch (error) {
    next(error);
  }
};
