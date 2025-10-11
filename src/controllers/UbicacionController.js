import {
  AgregarUbicacion,
  ListarUbicacionEspecifico,
  ListarUbicaciones,
  ModificarUbicacion,
  EliminarUbicacion,
} from "../service/UbicacionService.js";

export const SetUbicacion = async (req, res) => {
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
    res.status(200).json({
      message: "Se agrego el Ubicacion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateUbicacion = async (req, res) => {
  const { id } = req.params;
  const { latitud, longitud, tz_original, timestamp_utc, geohash, idCiudad } =
    req.body;
  try {
    await ModificarUbicacion(
      await ListarUbicacionEspecifico(id),
      latitud,
      longitud,
      tz_original,
      timestamp_utc,
      geohash,
      idCiudad
    );
    res.status(200).json({
      message: "Se modifico el Ubicacion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteUbicacion = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarUbicacion(await ListarUbicacionEspecifico(id));
    res.status(200).json({
      message: "Se elimino el Ubicacion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadUbicacion = async (req, res) => {
  try {
    const ubicaciones = await ListarUbicaciones();
    res.status(200).json(ubicaciones);
  } catch (error) {
    next(error);
  }
};

export const ReadUbicacionEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const ubicacion = await ListarUbicacionEspecifico(id);
    res.status(200).json(ubicacion);
  } catch (error) {
    next(error);
  }
};
