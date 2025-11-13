import {
  AgregarUbicacion,
  ListarUbicaciones,
  ModificarUbicacion,
  EliminarUbicacion,
} from "../service/UbicacionService.js";

export const SetUbicacion = async (req, res, next) => {
  const { latitud, longitud, tz_original, timestamp_utc, geohash, idCiudad } =
    req.body;
  try {
    await AgregarUbicacion(
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

export const UpdateUbicacion = async (req, res, next) => {
  const ubicacion = req.ubicacion;
  const { latitud, longitud, tz_original, timestamp_utc, geohash, idCiudad } =
    req.body;
  try {
    await ModificarUbicacion(
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

export const DeleteUbicacion = async (req, res, next) => {
  const ubicacion = req.ubicacion;
  try {
    await EliminarUbicacion(ubicacion);
    res.status(204).json({
      message: "Se elimino el Ubicacion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadUbicacion = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const ubicaciones = await ListarUbicaciones(page, size);
    res.status(200).json(ubicaciones);
  } catch (error) {
    next(error);
  }
};

export const ReadUbicacionEspecifico = async (req, res, next) => {
  const ubicacion = req.ubicacion;
  try {
    const ubi = ubicacion;
    res.status(200).json(ubi);
  } catch (error) {
    next(error);
  }
};
