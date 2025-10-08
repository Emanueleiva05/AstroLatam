import Publicacion from "../models/Publicacion.js";

export const AgregarPublicacion = async (
  titulo,
  descripcion,
  horaObservacion,
  fechaObservacion,
  idUbicacion
) => {
  return await Publicacion.create({
    titulo: titulo,
    horaObservacion: horaObservacion,
    descripcion: descripcion,
    fechaObservacion: fechaObservacion,
    idUbicacion: idUbicacion,
  });
};

export const ModificarObservacion = async (
  publicacion,
  titulo,
  descripcion,
  fechaPublicacion,
  idTipoPublicacion
) => {
  publicacion.titulo = titulo;
  publicacion.descripcion = descripcion;
  publicacion.fechaPublicacion = fechaPublicacion;
  publicacion.idTipoPublicacion = idTipoPublicacion;
  return await publicacion.save();
};

export const EliminarPublicacion = async (publicacion) => {
  return await publicacion.destroy();
};

export const ListarPublicaciones = async (id) => {
  return await Publicacion.findAll();
};

export const ListarPublicacionEspecifico = async (id) => {
  return await Publicacion.findByPk(id);
};
