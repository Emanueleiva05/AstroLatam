import Instrumento from "../models/Instrumento.js";

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
    nombre: nombre,
    apertura: apertura,
    descripcion: descripcion,
    distancia_focal: distancia_focal,
    tipo_telescopio: tipo_telescopio,
    aumento: aumento,
    diametro: diametro,
    tipo_prisma: tipo_prisma,
    idTipoInstrumento: idTipoInstrumento,
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
  return await Instrumento.findAll();
};

export const ListarInstrumentoEspecifico = async (id) => {
  return await Instrumento.findByPk(id);
};
