import {
  AgregarObservacion,
  EliminarObservacion,
  ModificarObservacion,
  ListarObservaciones,
  AgregarAdjunto,
  AgregarEvento,
  AgregarInstrumento,
  AgregarObjeto,
  EliminarAdjunto,
  EliminarEvento,
  EliminarInstrumento,
  EliminarObjeto,
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

export const SetAdjunto = async (req, res, next) => {
  try {
    await AgregarAdjunto(req.observacion, req.adjunto);
    res.status(200).json({ message: "Se agrego un adjunto en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const RemoveAdjunto = async (req, res, next) => {
  try {
    await EliminarAdjunto(req.observacion, req.adjunto);
    res
      .status(200)
      .json({ message: "Se elimino un adjunto en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const SetEvento = async (req, res, next) => {
  try {
    await AgregarEvento(req.observacion, req.evento);
    res.status(200).json({ message: "Se agrego un evento en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const RemoveEvento = async (req, res, next) => {
  try {
    await EliminarEvento(req.observacion, req.evento);
    res.status(200).json({ message: "Se elimino un evento en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const SetObjeto = async (req, res, next) => {
  try {
    await AgregarObjeto(req.observacion, req.objeto);
    res.status(200).json({ message: "Se agrego un objeto en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const RemoveObjeto = async (req, res, next) => {
  try {
    await EliminarObjeto(req.observacion, req.objeto);
    res.status(200).json({ message: "Se elimino un objeto en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const SetInstrumento = async (req, res, next) => {
  try {
    await AgregarInstrumento(req.observacion, req.instrumento);
    res
      .status(200)
      .json({ message: "Se agrego un instrumento en la observacion" });
  } catch (error) {
    next(error);
  }
};

export const RemoveInstrumento = async (req, res, next) => {
  try {
    await EliminarInstrumento(req.observacion, req.instrumento);
    res
      .status(200)
      .json({ message: "Se elimino un instrumento en la observacion" });
  } catch (error) {
    next(error);
  }
};
