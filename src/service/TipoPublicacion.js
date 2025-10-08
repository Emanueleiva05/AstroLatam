import TipoPublicacion from "../models/TipoPublicacion.js";

export const AgregarTipoPublicacion = async (nombre, descripcion) => {
  return await TipoPublicacion.create({
    nombre: nombre,
    descripcion: descripcion,
  });
};

export const ModificarTipoPublicacion = async (
  tipoPublicacion,
  nombre,
  descripcion
) => {
  tipoPublicacion.nombre = nombre;
  tipoPublicacion.descripcion = descripcion;
  return await tipoPublicacion.save();
};

export const EliminarTipoPublicacion = async (tipoPublicacion) => {
  return await tipoPublicacion.destroy();
};

export const ListarTipoPublicaciones = async () => {
  return await TipoPublicacion.findAll();
};

export const ListarTipoPublicacionEspecifico = async (id) => {
  return await TipoPublicacion.findByPk(id);
};
