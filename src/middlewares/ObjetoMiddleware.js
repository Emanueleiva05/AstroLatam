import AppError from "../utils/AppError.js";
import { ListarObjetoEspecifico } from "../service/ObjetoService.js";
import { ListarTipoObjetoEspecifico } from "../service/TipoObjetoService.js";
import { ListarAdjuntoEspecifico } from "../service/AdjuntoService.js";

export const ValidarDatosObjeto = (req, res, next) => {
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

export const VerificarExistenciaTipoObjeto = async (req, res, next) => {
  try {
    const { idTipoObjeto } = req.body;

    const tipoObjeto = await ListarTipoObjetoEspecifico(idTipoObjeto);
    if (!tipoObjeto) {
      throw new AppError("No se encontro el tipo objeto especifico", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarObjeto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const objeto = await ListarObjetoEspecifico(id);
    if (!objeto) {
      throw new AppError("No se encontro el objeto especifico", 404);
    }
    req.objeto = objeto;

    next();
  } catch (error) {
    next(error);
  }
};

export const EncontrarAdjunto = async (req, res, next) => {
  try {
    const { idAdjunto } = req.params;

    const adjunto = await ListarAdjuntoEspecifico(idAdjunto);
    if (!adjunto) {
      throw new AppError("No se encontro el adjunto especifico", 404);
    }
    req.adjunto = adjunto;

    next();
  } catch (error) {
    next(error);
  }
};
