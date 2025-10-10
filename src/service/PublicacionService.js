import Publicacion from "../models/Publicacion.js";

export const AgregarPublicacion = async (
  titulo,
  descripcion,
  idUsuario,
  fechaPublicacion,
  idTipoPublicacion
) => {
  return await Publicacion.create({
    titulo: titulo,
    idTipoPublicacion: idTipoPublicacion,
    descripcion: descripcion,
    fechaPublicacion: fechaPublicacion,
    idUsuario: idUsuario,
  });
};

export const ModificarPublicacion = async (
  publicacion,
  titulo,
  descripcion,
  idUsuario,
  fechaPublicacion,
  idTipoPublicacion
) => {
  publicacion.titulo = titulo;
  publicacion.descripcion = descripcion;
  publicacion.fechaPublicacion = fechaPublicacion;
  publicacion.idTipoPublicacion = idTipoPublicacion;
  publicacion.idUsuario = idUsuario;
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
