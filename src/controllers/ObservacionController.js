import {
  AgregarObservacion,
  EliminarObservacion,
  ModificarObservacion,
  ListarObservaciones,
} from "../service/ObservacionService.js";

export const SetObservacion = async (req, res, next) => {
  const {
    titulo,
    descripcion,
    horaObservacion,
    fechaObservacion,
    idUbicacion,
  } = req.body;
  try {
    await AgregarObservacion(
      titulo,
      descripcion,
      horaObservacion,
      fechaObservacion,
      idUbicacion
    );
    res.status(200).json({ message: "Observacion creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateObservacion = async (req, res, next) => {
  const observacion = req.observacion;
  const {
    titulo,
    descripcion,
    horaObservacion,
    fechaObservacion,
    idUbicacion,
  } = req.body;

  try {
    await ModificarObservacion(
      observacion,
      titulo,
      descripcion,
      horaObservacion,
      fechaObservacion,
      idUbicacion
    );
    res.status(200).json({ message: "Observacion modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteObservacion = async (req, res, next) => {
  const observacion = req.observacion;
  try {
    await EliminarObservacion(observacion);
    res.status(200).json({ message: "Observacion eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadObservacion = async (req, res, next) => {
  try {
    const observaciones = await ListarObservaciones();
    res.status(200).json(observaciones);
  } catch (error) {
    next(error);
  }
};

export const ReadObservacionEspecifico = async (req, res, next) => {
  const observacion = req.observacion;
  try {
    const obs = observacion;
    res.status(200).json(obs);
  } catch (error) {
    next(error);
  }
};
