import AppError from "../utils/AppError.js";
import { getPublicationTypeById } from "../service/TipoPublicacionService.js";

export const validatePublicationTypeData = (req, res, next) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el tipo publicacion", 400);
  }

  if (!descripcion) {
    throw new AppError("Descripcion no valido para el tipo publicacion", 400);
  }

  next();
};

export const findPublicationType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tipoPublicacion = await getPublicationTypeById(id);

    if (!tipoPublicacion) {
      throw new AppError("No se encontro el tipoPublicacion especifico", 404);
    }

    req.tipoPublicacion = tipoPublicacion;

    next();
  } catch (error) {
    next(error);
  }
};
