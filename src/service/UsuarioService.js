import Usuario from "../models/Usuario.js";
import AppError from "../utils/AppError.js";
import clientRedis from "../settings/redis.js";

export const ModificarUsuario = async (
  usuario,
  username,
  nombre,
  email,
  password,
  descripcion,
  numero,
  rol,
  idAdjunto,
  idCiudad
) => {
  usuario.username = username;
  usuario.nombre = nombre;
  usuario.email = email;
  usuario.password = password;
  usuario.descripcion = descripcion;
  usuario.numero = numero;
  usuario.rol = rol;
  usuario.idAdjunto = idAdjunto;
  usuario.idCiudad = idCiudad;
  return await usuario.save();
};

export const EliminarUsuario = async (usuario) => {
  return await usuario.destroy();
};

export const ListarUsuario = async (page, size) => {
  if (!page) page = 0;
  if (!size) size = 5;

  const reply = await clientRedis.get(
    `usuario:listado:page=${page}:size=${size}`
  );
  if (reply) return JSON.parse(reply);

  const options = {
    limit: parseInt(size),
    offset: parseInt(size) * parseInt(page),
  };

  const { count, rows } = await Usuario.findAndCountAll(options);
  if (rows.length === 0) {
    throw new AppError("No se encontraron usuarios creados", 404);
  }

  const response = {
    data: rows,
    meta: {
      page: parseInt(page),
      size: options.limit,
      totalItem: count,
      totalPage: Math.ceil(count / options.limit),
      hasNextPage: options.offset + options.limit < count,
      havPrevPage: page > 0,
    },
  };

  await clientRedis.set(
    `usuario:listado:page=${page}:size=${size}`,
    JSON.stringify(response),
    {
      EX: 3600,
    }
  );

  return response;
};

export const ListarUsuarioEspecifico = async (id) => {
  const usuario = await Usuario.findByPk(id);
  return usuario;
};

export const ListarUsuarioUsernameEspecifico = async (username) => {
  const usuario = await Usuario.findOne({ where: { username: username } });
  if (!usuario) throw new AppError("No se encontro el usuario", 401);
  return usuario.toJSON();
};

export const AgregarInstrumento = async (usuario, instrumento) => {
  return await usuario.addInstrumento(instrumento);
};

export const ELiminarInstrumento = async (usuario, instrumento) => {
  return await usuario.removeInstrumento(instrumento);
};

export const ListarInstrumentos = async (usuario) => {
  return await usuario.getInstrumentos();
};

export const ListarInstrumentosEspecificoUsuario = async (
  usuario,
  idInstrumento
) => {
  return await usuario.getInstrumentos({
    where: {
      idInstrumento: idInstrumento,
    },
  });
};
