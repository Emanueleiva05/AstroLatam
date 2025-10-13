import {
  AgregarObjeto,
  EliminarObjeto,
  ModificarObjeto,
  ListarObjetos,
} from "../service/ObjetoService.js";

export const SetObjeto = async (req, res, next) => {
  const { nombre, descripcion, idTipoObjeto } = req.body;
  try {
    await AgregarObjeto(nombre, descripcion, idTipoObjeto);
    res.status(200).json({ message: "Objeto creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateObjeto = async (req, res, next) => {
  const objeto = req.objeto;
  const { nombre, descripcion, idTipoObjeto } = req.body;

  try {
    await ModificarObjeto(objeto, nombre, descripcion, idTipoObjeto);
    res.status(200).json({ message: "Objeto modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteObjeto = async (req, res, next) => {
  const objeto = req.objeto;
  try {
    await EliminarObjeto(objeto);
    res.status(200).json({ message: "Objeto eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadObjeto = async (req, res, next) => {
  try {
    const objetos = await ListarObjetos();
    res.status(200).json(objetos);
  } catch (error) {
    next(error);
  }
};

export const ReadObjetoEspecifico = async (req, res, next) => {
  const objeto = req.objeto;
  try {
    const obj = objeto;
    res.status(200).json(obj);
  } catch (error) {
    next(error);
  }
};
