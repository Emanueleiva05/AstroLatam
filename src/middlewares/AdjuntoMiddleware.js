import AppError from "../utils/AppError.js";
import { getAttachmentById } from "../service/AdjuntoService.js";
import { getAttachmentTypeById } from "../service/TipoAdjuntoService.js";

export const validateAttachmentData = (req, res, next) => {
  const { link_archivo, descripcion, idTipoAdjunto } = req.body;

  if (!link_archivo || link_archivo.trim() === "") {
    throw new AppError("Link del archivo no valido para el adjunto", 400);
  }

  if (!descripcion) {
    throw new AppError("Descripcion no valido para el adjunto", 400);
  }

  if (!idTipoAdjunto || isNaN(Number(idTipoAdjunto))) {
    throw new AppError("idTipoAdjunto no valido para el adjunto", 400);
  }

  next();
};

export const findAttachment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const adjunto = await getAttachmentById(id);
    if (!adjunto) {
      throw new AppError("No se encontro el adjunto especifico", 404);
    }
    req.adjunto = adjunto;

    next();
  } catch (error) {
    next(error);
  }
};

export const validateAttachmentTypeExists = async (req, res, next) => {
  try {
    const { idTipoAdjunto } = req.body;

    const tipoAdjunto = await getAttachmentTypeById(idTipoAdjunto);
    if (!tipoAdjunto) {
      throw new AppError("No se encontro el tipo adjunto especifico", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};
