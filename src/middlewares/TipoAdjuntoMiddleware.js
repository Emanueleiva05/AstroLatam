import AppError from "../utils/AppError.js";
import { getAttachmentTypeById } from "../service/TipoAdjuntoService.js";

export const validateAttachmentTypeData = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el tipo adjunto", 400);
  }

  next();
};

export const findAttachmentType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tipoAdjunto = await getAttachmentTypeById(id);

    if (!tipoAdjunto) {
      throw new AppError("No se encontro el tipoAdjunto especifico", 404);
    }

    req.tipoAdjunto = tipoAdjunto;

    next();
  } catch (error) {
    next(error);
  }
};
