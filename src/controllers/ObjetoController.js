import {
  AgregarObjeto,
  EliminarObjeto,
  ModificarObjeto,
  ListarObjetoEspecifico,
  ListarObjetos,
} from "../service/ObjetoService.js";

export const SetObjeto = async (req, res) => {
  const { nombre, descripcion, idTipoObjeto } = req.body;
  try {
    await AgregarObjeto(nombre, descripcion, idTipoObjeto);
    res.status(200).json({ message: "Objeto creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateObjeto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, idTipoObjeto } = req.body;

  try {
    await ModificarObjeto(
      await ListarObjetoEspecifico(id),
      nombre,
      descripcion,
      idTipoObjeto
    );
    res.status(200).json({ message: "Objeto modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteObjeto = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarObjeto(await ListarObjetoEspecifico(id));
    res.status(200).json({ message: "Objeto eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadObjeto = async (req, res) => {
  try {
    const objetos = await ListarObjetos();
    res.status(200).json(objetos);
  } catch (error) {
    next(error);
  }
};

export const ReadObjetoEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const objeto = await ListarObjetoEspecifico(id);
    res.status(200).json(objeto);
  } catch (error) {
    next(error);
  }
};
