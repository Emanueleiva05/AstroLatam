import AppError from "../utils/AppError.js";
import { ListarObservacionEspecifico } from "../service/ObservacionService.js";
import { ListarUbicacionEspecifico } from "../service/UbicacionService.js";

export const ValidarDatosObservacion = (req, res, next) => {
  const {
    titulo,
    descripcion,
    horaObservacion,
    fechaObservacion,
    idUbicacion,
  } = req.body;

  if (!titulo || titulo.trim() === "") {
    throw new AppError("Nombre no valido para la observacion", 400);
  }

  if (!descripcion || descripcion.trim() === "") {
    throw new AppError("descripcion no valido para la observacion", 400);
  }

  if (!horaObservacion) {
    throw new AppError("horaObservacion no valido para la observacion", 400);
  }

  if (!fechaObservacion || isNaN(Date.parse(fechaObservacion))) {
    throw new AppError("fechaObservacion no valido para la observacion", 400);
  }

  if (!idUbicacion || isNaN(Number(idUbicacion))) {
    throw new AppError("idUbicacion no valido", 400);
  }

  next();
};

export const EncontrarObservacion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const observacion = await ListarObservacionEspecifico(id);
    if (!observacion) {
      throw new AppError("No se encontro la observacion especifica", 404);
    }
    req.observacion = observacion;

    next();
  } catch (error) {
    next(error);
  }
};

export const VerificarExistenciaUbicacion = async (req, res, next) => {
  try {
    const { idUbicacion } = req.body;

    const ubicacion = await ListarUbicacionEspecifico(idUbicacion);
    if (!ubicacion) {
      throw new AppError("No se encontro la ubicacion especifica", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};
