import Instrumento from "../models/Instrumento.js";
import AppError from "../utils/AppError.js";

export const AgregarInstrumento = async (
  nombre,
  descripcion,
  apertura,
  distancia_focal,
  tipo_telescopio,
  aumento,
  diametro,
  tipo_prisma,
  idTipoInstrumento
) => {
  return await Instrumento.create({
    nombre,
    apertura,
    descripcion,
    distancia_focal,
    tipo_telescopio,
    aumento,
    diametro,
    tipo_prisma,
    idTipoInstrumento,
  });
};

export const ModificarInstrumento = async (
  instrumento,
  nombre,
  descripcion,
  apertura,
  distancia_focal,
  tipo_telescopio,
  aumento,
  diametro,
  tipo_prisma,
  idTipoInstrumento
) => {
  instrumento.nombre = nombre;
  instrumento.descripcion = descripcion;
  instrumento.apertura = apertura;
  instrumento.distancia_focal = distancia_focal;
  instrumento.tipo_telescopio = tipo_telescopio;
  instrumento.aumento = aumento;
  instrumento.diametro = diametro;
  instrumento.tipo_prisma = tipo_prisma;
  instrumento.idTipoInstrumento = idTipoInstrumento;
  return await instrumento.save();
};

export const EliminarInstrumento = async (instrumento) => {
  return await instrumento.destroy();
};

export const ListarInstrumentos = async (id) => {
  const instrumentos = await Instrumento.findAll();
  if (instrumentos.length === 0) {
    throw new AppError("No se encontraron instrumentos creados", 404);
  }
  return instrumentos;
};

export const ListarInstrumentoEspecifico = async (id) => {
  const instrumento = await Instrumento.findByPk(id);
  return instrumento;
};
