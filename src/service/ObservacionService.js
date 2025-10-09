import Observacion from "../models/Observacion.js";

export const AgregarObservacion = async (
  titulo,
  descripcion,
  horaObservacion,
  fechaObservacion,
  idUbicacion
) => {
  return await Observacion.create({
    titulo: titulo,
    horaObservacion: horaObservacion,
    descripcion: descripcion,
    fechaObservacion: fechaObservacion,
    idUbicacion: idUbicacion,
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
  return await Observacion.findAll({ where: { idUbicacion: id } });
};

export const ListarObservacionEspecifico = async (id) => {
  return await Observacion.findByPk(id);
};
