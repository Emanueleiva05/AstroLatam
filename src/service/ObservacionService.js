import Observacion from "../models/Observacion.js";
import AppError from "../utils/AppError.js";

export const AgregarObservacion = async (
  titulo,
  descripcion,
  horaObservacion,
  fechaObservacion,
  idUbicacion
) => {
  return await Observacion.create({
    titulo,
    horaObservacion,
    descripcion,
    fechaObservacion,
    idUbicacion,
  });
};

export const ModificarObservacion = async (
  observacion,
  titulo,
  descripcion,
  horaObservacion,
  fechaObservacion,
  idUbicacion
) => {
  observacion.titulo = titulo;
  observacion.descripcion = descripcion;
  observacion.horaObservacion = horaObservacion;
  observacion.fechaObservacion = fechaObservacion;
  observacion.idUbicacion = idUbicacion;
  return await observacion.save();
};

export const EliminarObservacion = async (observacion) => {
  return await observacion.destroy();
};

export const ListarObservaciones = async (id) => {
  const observaciones = await Observacion.findAll({
    where: { idUbicacion: id },
  });
  if (observaciones.length === 0) {
    throw new AppError("No se encontraron observacion creados", 404);
  }
  return observaciones;
};

export const ListarObservacionEspecifico = async (id) => {
  const observacion = await Observacion.findByPk(id);
  return observacion;
};
