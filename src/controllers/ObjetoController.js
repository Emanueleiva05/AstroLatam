import {
  createObject,
  deleteObject,
  updateObject,
  getObjects,
  addObjectAttachment,
  removeObjectAttachment,
  getObjectAttachments,
} from "../service/ObjetoService.js";

export const createObjectHandler = async (req, res, next) => {
  const { nombre, descripcion, idTipoObjeto } = req.body;
  try {
    await createObject(nombre, descripcion, idTipoObjeto);
    res.status(201).json({ message: "Objeto creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const updateObjectHandler = async (req, res, next) => {
  const objeto = req.objeto;
  const { nombre, descripcion, idTipoObjeto } = req.body;

  try {
    await updateObject(objeto, nombre, descripcion, idTipoObjeto);
    res.status(204).json({ message: "Objeto modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const deleteObjectHandler = async (req, res, next) => {
  const objeto = req.objeto;
  try {
    await deleteObject(objeto);
    res.status(204).json({ message: "Objeto eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const getObjectsHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const objetos = await getObjects(page, size);
    res.status(200).json(objetos);
  } catch (error) {
    next(error);
  }
};

export const getObjectHandler = async (req, res, next) => {
  const objeto = req.objeto;
  try {
    const obj = objeto;
    res.status(200).json(obj);
  } catch (error) {
    next(error);
  }
};

export const addObjectAttachmentHandler = async (req, res, next) => {
  try {
    await addObjectAttachment(req.objeto, req.adjunto);
    res.status(201).json({ message: "Se agrego el adjunto con exito" });
  } catch (error) {
    next(error);
  }
};

export const removeObjectAttachmentHandler = async (req, res, next) => {
  try {
    await removeObjectAttachment(req.objeto, req.adjunto);
    res.status(204).json({ message: "Se elimino el adjunto con exito" });
  } catch (error) {
    next(error);
  }
};

export const getObjectAttachmentsHandler = async (req, res, next) => {
  try {
    const adjuntos = await getObjectAttachments(req.objeto);
    res.status(200).json(adjuntos);
  } catch (error) {
    next(error);
  }
};

export const getObjectAttachmentHandler = async (req, res, next) => {
  try {
    res.status(200).json(req.adjunto);
  } catch (error) {
    next(error);
  }
};
