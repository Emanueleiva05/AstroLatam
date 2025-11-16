import Ubicacion from "../models/Ubicacion.js";
import AppError from "../utils/AppError.js";

export const createLocation = async (
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

export const updateLocation = async (
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

export const deleteLocation = async (ubicacion) => {
  return await ubicacion.destroy();
};

export const getLocations = async (page, size) => {
  if (!page) page = 0;
  if (!size) size = 5;

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const { count, rows } = await Ubicacion.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron ubicaciones creadas", 404);
  }
  return {
    data: rows,
    meta: {
      page: parseInt(page),
      size: options.limit,
      totalItem: count,
      totalPage: Math.ceil(count / options.limit),
      hasNextPage: options.offset + options.limit < count,
      havPrevPage: page > 0,
    },
  };
};

export const getLocationById = async (id) => {
  const ubicacion = await Ubicacion.findByPk(id);
  return ubicacion;
};
