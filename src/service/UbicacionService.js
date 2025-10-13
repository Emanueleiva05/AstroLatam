import Ubicacion from "../models/Ubicacion.js";
import AppError from "../utils/AppError.js";

export const AgregarUbicacion = async (
  latitud,
  longitud,
  tz_original,
  timestamp_utc,
  geohash,
  idCiudad
) => {
  return await Ubicacion.create({
    latitud,
    longitud,
    tz_original,
    timestamp_utc,
    geohash,
    idCiudad,
  });
};

export const ModificarUbicacion = async (
  ubicacion,
  latitud,
  longitud,
  tz_original,
  timestamp_utc,
  geohash
) => {
  ubicacion.longitud = longitud;
  ubicacion.latitud = latitud;
  ubicacion.tz_original = tz_original;
  ubicacion.timestamp_utc = timestamp_utc;
  ubicacion.geohash = geohash;
  return await ubicacion.save();
};

export const EliminarUbicacion = async (ubicacion) => {
  return await ubicacion.destroy();
};

export const ListarUbicaciones = async () => {
  const ubicaciones = await Ubicacion.findAll();
  if (ubicaciones.length === 0) {
    throw new AppError("No se encontraron ubicaciones creadas", 404);
  }
  return ubicaciones;
};

export const ListarUbicacionEspecifico = async (id) => {
  const ubicacion = await Ubicacion.findByPk(id);
  return ubicacion;
};
