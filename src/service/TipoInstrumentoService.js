import TipoInstrumento from "../models/TipoInstrumento.js";

export const AgregarTipoInstrumento = async (nombre, descripcion) => {
  return await TipoInstrumento.create({
    nombre: nombre,
    descripcion: descripcion,
  });
};

export const ModificarTipoInstrumento = async (
  tipoInstrumento,
  nombre,
  descripcion
) => {
  tipoInstrumento.nombre = nombre;
  tipoInstrumento.descripcion = descripcion;
  return await tipoInstrumento.save();
};

export const EliminarTipoInstrumento = async (tipoInstrumento) => {
  return await tipoInstrumento.destroy();
};

export const ListarTipoInstrumentos = async () => {
  return await TipoInstrumento.findAll();
};

export const ListarTipoInstrumentoEspecifico = async (id) => {
  return await TipoInstrumento.findByPk(id);
};
