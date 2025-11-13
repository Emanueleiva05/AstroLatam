import {
  AgregarObjeto,
  EliminarObjeto,
  ModificarObjeto,
  ListarObjetos,
  AgregarAdjunto,
  EliminarAdjunto,
  ListarAdjuntos,
} from "../service/ObjetoService.js";

export const SetObjeto = async (req, res, next) => {
  const { nombre, descripcion, idTipoObjeto } = req.body;
  try {
    await AgregarObjeto(nombre, descripcion, idTipoObjeto);
    res.status(201).json({ message: "Objeto creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateObjeto = async (req, res, next) => {
  const objeto = req.objeto;
  const { nombre, descripcion, idTipoObjeto } = req.body;

  try {
    await ModificarObjeto(objeto, nombre, descripcion, idTipoObjeto);
    res.status(204).json({ message: "Objeto modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteObjeto = async (req, res, next) => {
  const objeto = req.objeto;
  try {
    await EliminarObjeto(objeto);
    res.status(204).json({ message: "Objeto eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadObjeto = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const objetos = await ListarObjetos(page, size);
    res.status(200).json(objetos);
  } catch (error) {
    next(error);
  }
};

export const ReadObjetoEspecifico = async (req, res, next) => {
  const objeto = req.objeto;
  try {
    const obj = objeto;
    res.status(200).json(obj);
  } catch (error) {
    next(error);
  }
};

export const SetAdjunto = async (req, res, next) => {
  try {
    await AgregarAdjunto(req.objeto, req.adjunto);
    res.status(201).json({ message: "Se agrego el adjunto con exito" });
  } catch (error) {
    next(error);
  }
};

export const RemoveAdjunto = async (req, res, next) => {
  try {
    await EliminarAdjunto(req.objeto, req.adjunto);
    res.status(204).json({ message: "Se elimino el adjunto con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadAdjuntos = async (req, res, next) => {
  try {
    const adjuntos = await ListarAdjuntos(req.objeto);
    res.status(200).json(adjuntos);
  } catch (error) {
    next(error);
  }
};

export const ReadAdjuntoEspecifico = async (req, res, next) => {
  try {
    res.status(200).json(req.adjunto);
  } catch (error) {
    next(error);
  }
};
