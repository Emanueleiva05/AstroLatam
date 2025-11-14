import Instrumento from "../models/Instrumento.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";

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
  const nuevo = await Instrumento.create({
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

  await clientRedis.del("instrumento:listado");

  return nuevo;
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
  await clientRedis.del("instrumento:listado");
  await clientRedis.del(`instrumento:${instrumento.idInstrumento}`);
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
  await clientRedis.del("instrumento:listado");
  await clientRedis.del(`instrumento:${instrumento.idInstrumento}`);
  return await instrumento.destroy();
};

export const ListarInstrumentos = async () => {
  const reply = await clientRedis.get("instrumento:listado");
  if (reply) return JSON.parse(reply);

  const rows = await Instrumento.findAll();

  if (rows.length === 0) {
    throw new AppError("No se encontraron instrumentos creados", 404);
  }

  await clientRedis.set("instrumento:listado", JSON.stringify(rows), {
    EX: 3600,
  });

  return rows;
};

export const ListarInstrumentoEspecifico = async (id) => {
  const reply = await clientRedis.get(`instrumento:${id}`);
  if (reply) return JSON.parse(reply);

  const instrumento = await Instrumento.findByPk(id);

  await clientRedis.set(`instrumento:${id}`, JSON.stringify(instrumento), {
    EX: 3600,
  });
  return instrumento;
};
