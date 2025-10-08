import Ubicacion from "../models/Ubicacion.js";

export const AgregarUbicacion = async (
  latitud,
  longitud,
  tz_original,
  timestamp_utc,
  geohash,
  idCiudad
) => {
  return await Ubicacion.create({
    latitud: latitud,
    longitud: longitud,
    tz_original: tz_original,
    timestamp_utc: timestamp_utc,
    geohash: geohash,
    idCiudad: idCiudad,
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
  return await Ubicacion.findAll();
};

export const ListarUbicacionEspecifico = async (id) => {
  return await Ubicacion.findByPk(id);
};
