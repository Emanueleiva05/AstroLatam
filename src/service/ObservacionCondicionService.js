import ObservacionCondicion from "../models/ObservacionCondicion.js";

export const AgregarObservacionCondicion = async (
  valor,
  idTipoCondicion,
  idObservacion
) => {
  return await ObservacionCondicion.create({
    valor: valor,
    idTipoCondicion: idTipoCondicion,
    idObservacion: idObservacion,
  });
};

export const ModificarObservacionCondicion = async (
  observacionCondicion,
  valor,
  idTipoCondicion,
  idObservacion
) => {
  observacionCondicion.idTipoCondicion = idTipoCondicion;
  observacionCondicion.valor = valor;
  observacionCondicion.idObservacion = idObservacion;
  return await observacionCondicion.save();
};

export const EliminarObservacionCondicion = async (observacionCondicion) => {
  return await observacionCondicion.destroy();
};

export const ListarObservacionCondiciones = async () => {
  return await ObservacionCondicion.findAll();
};

export const ListarObservacionCondicionEspecifico = async (id) => {
  return await ObservacionCondicion.findByPk(id);
};
