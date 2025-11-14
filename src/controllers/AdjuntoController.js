import {
  AgregarAdjunto,
  ModificarAdjunto,
  ListarAdjunto,
  EliminarAdjunto,
} from "../service/AdjuntoService.js";

export const SetAdjunto = async (req, res, next) => {
  const { link_archivo, descripcion, idTipoAdjunto } = req.body;
  try {
    await AgregarAdjunto(link_archivo, descripcion, idTipoAdjunto);
    res.status(201).json({ message: "Adjunto creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateAdjunto = async (req, res, next) => {
  const adjunto = req.adjunto;
  const { link_archivo, descripcion, idTipoAdjunto } = req.body;

  try {
    await ModificarAdjunto(adjunto, link_archivo, descripcion, idTipoAdjunto);
    res.status(204).json({ message: "Adjunto modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteAdjunto = async (req, res, next) => {
  const adjunto = req.adjunto;
  try {
    await EliminarAdjunto(adjunto);
    res.status(204).json({ message: "Adjunto eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadAdjuntos = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const adjuntos = await ListarAdjunto(page, size);
    res.status(200).json(adjuntos);
  } catch (error) {
    next(error);
  }
};

export const ReadAdjuntoEspecifico = async (req, res, next) => {
  const adjunto = req.adjunto;
  try {
    const adj = adjunto;
    res.status(200).json(adj);
  } catch (error) {
    next(error);
  }
};
