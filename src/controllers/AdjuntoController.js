import {
  createAttachment,
  updateAttachment,
  getAttachments,
  deleteAttachment,
} from "../service/AdjuntoService.js";

export const createAttachmentHandler = async (req, res, next) => {
  const { link_archivo, descripcion, idTipoAdjunto } = req.body;
  try {
    await createAttachment(link_archivo, descripcion, idTipoAdjunto);
    res.status(201).json({ message: "Adjunto creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const updateAttachmentHandler = async (req, res, next) => {
  const adjunto = req.adjunto;
  const { link_archivo, descripcion, idTipoAdjunto } = req.body;

  try {
    await updateAttachment(adjunto, link_archivo, descripcion, idTipoAdjunto);
    res.status(204).json({ message: "Adjunto modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const deleteAttachmentHandler = async (req, res, next) => {
  const adjunto = req.adjunto;
  try {
    await deleteAttachment(adjunto);
    res.status(204).json({ message: "Adjunto eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const getAttachmentsHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const adjuntos = await getAttachments(page, size);
    res.status(200).json(adjuntos);
  } catch (error) {
    next(error);
  }
};

export const getAttachmentHandler = async (req, res, next) => {
  const adjunto = req.adjunto;
  try {
    const adj = adjunto;
    res.status(200).json(adj);
  } catch (error) {
    next(error);
  }
};
