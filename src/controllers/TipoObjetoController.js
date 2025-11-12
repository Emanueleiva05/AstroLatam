import {
  AgregarTipoObjeto,
  ModificarTipoObjeto,
  EliminarTipoObjeto,
  ListarTipoObjetos,
} from "../service/TipoObjetoService.js";

export const SetTipoObjeto = async (req, res, next) => {
  const { nombre, descripcion } = req.body;
  try {
    await AgregarTipoObjeto(nombre, descripcion);
    res.status(201).json({ message: "Se creo el Tipo Objeto con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateTipoObjeto = async (req, res, next) => {
  const tipoObjeto = req.tipoObjeto;
  const { nombre, descripcion } = req.body;
  try {
    await ModificarTipoObjeto(tipoObjeto, nombre, descripcion);
    res.status(204).json({ message: "Se modifico el Tipo Objeto con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteTipoObjeto = async (req, res, next) => {
  const tipoObjeto = req.tipoObjeto;
  try {
    await EliminarTipoObjeto(tipoObjeto);
    res.status(204).json({ message: "Se elimino el Tipo Objeto con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadTipoObjetoEspecifico = async (req, res, next) => {
  const tipoObjeto = req.tipoObjeto;
  try {
    const tipoOb = tipoObjeto;
    res.status(200).json(tipoOb);
  } catch (error) {
    next(error);
  }
};

export const ReadTipoObjeto = async (req, res, next) => {
  try {
    const tipoObjeto = await ListarTipoObjetos();
    res.status(200).json(tipoObjeto);
  } catch (error) {
    next(error);
  }
};
