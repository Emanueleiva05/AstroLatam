import {
  createLocation,
  getLocations,
  updateLocation,
  deleteLocation,
} from "../service/UbicacionService.js";

export const createLocationHandler = async (req, res, next) => {
  const { latitud, longitud, tz_original, timestamp_utc, geohash, idCiudad } =
    req.body;
  try {
    await createLocation(
      latitud,
      longitud,
      tz_original,
      timestamp_utc,
      geohash,
      idCiudad
    );
    res.status(201).json({
      message: "Se agrego el Ubicacion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const updateLocationHandler = async (req, res, next) => {
  const ubicacion = req.ubicacion;
  const { latitud, longitud, tz_original, timestamp_utc, geohash, idCiudad } =
    req.body;
  try {
    await updateLocation(
      ubicacion,
      latitud,
      longitud,
      tz_original,
      timestamp_utc,
      geohash,
      idCiudad
    );
    res.status(204).json({
      message: "Se modifico el Ubicacion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLocationHandler = async (req, res, next) => {
  const ubicacion = req.ubicacion;
  try {
    await deleteLocation(ubicacion);
    res.status(204).json({
      message: "Se elimino el Ubicacion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const getLocationsHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const ubicaciones = await getLocations(page, size);
    res.status(200).json(ubicaciones);
  } catch (error) {
    next(error);
  }
};

export const getLocationHandler = async (req, res, next) => {
  const ubicacion = req.ubicacion;
  try {
    const ubi = ubicacion;
    res.status(200).json(ubi);
  } catch (error) {
    next(error);
  }
};
