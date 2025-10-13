import AppError from "../utils/AppError.js";
import { ListarUbicacionEspecifico } from "../service/UbicacionService.js";
import { ListarCiudadEspecifico } from "../service/CiudadService.js";

export const ValidarDatosUbicacion = (req, res, next) => {
  const { latitud, longitud, tz_original, timestamp_utc, geohash, idCiudad } =
    req.body;

  if (isNaN(Number(longitud)) || latitud < -90 || latitud > 90) {
    throw new AppError("Latitud no valida para la ubicacion", 400);
  }

  if (longitud < -180 || longitud > 180 || isNaN(Number(longitud))) {
    throw new AppError("Longitud no valido para la ubicacion", 400);
  }

  if (!tz_original || typeof tz_original !== "string") {
    throw new AppError("TZ_Original no valido para la ubicacion", 400);
  }

  if (!timestamp_utc || isNaN(Date.parse(timestamp_utc))) {
    throw new AppError("Timestamp no valido para la ubicacion", 400);
  }

  if (!geohash) {
    throw new AppError("Geohash no valido para la ubicacion", 400);
  }

  if (!idCiudad || isNaN(Number(idCiudad))) {
    throw new AppError("idCiudad no valido para la ubicacion", 400);
  }

  next();
};

export const EncontrarUbicacion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ubicacion = await ListarUbicacionEspecifico(id);
    if (!ubicacion) {
      throw new AppError("No se encontro la ubicacion especifica", 404);
    }
    req.ubicacion = ubicacion;

    next();
  } catch (error) {
    next(error);
  }
};

export const VerificarExistenciaCiudad = async (req, res, next) => {
  try {
    const { idCiudad } = req.body;

    const ciudad = await ListarCiudadEspecifico(idCiudad);
    if (!ciudad) {
      throw new AppError("No se encontro la ciudad especifica", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};
