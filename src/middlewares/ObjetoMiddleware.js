import AppError from "../utils/AppError.js";
import {
  getObjectById,
  getObjectAttachmentById,
} from "../service/ObjetoService.js";
import { getObjectTypeById } from "../service/TipoObjetoService.js";
import { getAttachmentById } from "../service/AdjuntoService.js";

export const validateObjectData = (req, res, next) => {
  const { nombre, descripcion, idTipoObjeto } = req.body;

  if (!nombre || nombre.trim() === "") {
    throw new AppError("Nombre no valido para el objeto", 400);
  }

  if (!descripcion || descripcion.trim() === "") {
    throw new AppError("Descripcion no valido para el objeto", 400);
  }

  if (!idTipoObjeto || isNaN(Number(idTipoObjeto))) {
    throw new AppError("idTipoObjeto no valido para el objeto", 400);
  }

  next();
};

export const validateObjectTypeExists = async (req, res, next) => {
  try {
    const { idTipoObjeto } = req.body;

    const tipoObjeto = await getObjectTypeById(idTipoObjeto);
    if (!tipoObjeto) {
      throw new AppError("No se encontro el tipo objeto especifico", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const findObject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const objeto = await getObjectById(id);
    if (!objeto) {
      throw new AppError("No se encontro el objeto especifico", 404);
    }
    req.objeto = objeto;
    next();
  } catch (error) {
    next(error);
  }
};

export const findAttachment = async (req, res, next) => {
  try {
    const { idAdjunto } = req.params;

    const adjunto = await getAttachmentById(idAdjunto);
    if (!adjunto) {
      throw new AppError("No se encontro el adjunto especifico", 404);
    }
    req.adjunto = adjunto;

    next();
  } catch (error) {
    next(error);
  }
};

export const findObjectAttachment = async (req, res, next) => {
  try {
    const adjunto = await getObjectAttachmentById(
      req.objeto,
      req.params.idAdjunto
    );
    if (adjunto.length === 0) {
      throw new AppError("No se encontro el adjunto del evento");
    }
    req.adjunto = adjunto[0];

    next();
  } catch (error) {
    next(error);
  }
};
