import {
  createAttachmentType,
  getAttachmentTypes,
  deleteAttachmentType,
  updateAttachmentType,
} from "../service/TipoAdjuntoService.js";

export const createAttachmentTypeHandler = async (req, res, next) => {
  const { nombre } = req.body;
  try {
    await createAttachmentType(nombre);
    res.status(201).json({
      message: "Se agrego el TipoAdjunto con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const updateAttachmentTypeHandler = async (req, res, next) => {
  const { nombre } = req.body;
  const tipoAdjunto = req.tipoAdjunto;
  try {
    await updateAttachmentType(tipoAdjunto, nombre);
    res.status(204).json({
      message: "Se modifico el TipoAdjunto con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAttachmentTypeHandler = async (req, res, next) => {
  const tipoAdjunto = req.tipoAdjunto;

  try {
    await deleteAttachmentType(tipoAdjunto);
    res.status(204).json({
      message: "Se elimino el TipoAdjunto con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const getAttachmentTypesHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const TiposAdjuntos = await getAttachmentTypes(page, size);
    res.status(200).json(TiposAdjuntos);
  } catch (error) {
    next(error);
  }
};

export const getAttachmentTypeHandler = async (req, res, next) => {
  const tipoAdjunto = req.tipoAdjunto;
  try {
    const tipoAd = tipoAdjunto;
    res.status(200).json(tipoAd);
  } catch (error) {
    next(error);
  }
};
