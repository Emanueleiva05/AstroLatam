import {
  createObjectType,
  updateObjectType,
  deleteObjectType,
  getObjectTypes,
} from "../service/TipoObjetoService.js";

export const createObjectTypeHandler = async (req, res, next) => {
  const { nombre, descripcion } = req.body;
  try {
    await createObjectType(nombre, descripcion);
    res.status(201).json({ message: "Se creo el Tipo Objeto con exito" });
  } catch (error) {
    next(error);
  }
};

export const updateObjectTypeHandler = async (req, res, next) => {
  const tipoObjeto = req.tipoObjeto;
  const { nombre, descripcion } = req.body;
  try {
    await updateObjectType(tipoObjeto, nombre, descripcion);
    res.status(204).json({ message: "Se modifico el Tipo Objeto con exito" });
  } catch (error) {
    next(error);
  }
};

export const deleteObjectTypeHandler = async (req, res, next) => {
  const tipoObjeto = req.tipoObjeto;
  try {
    await deleteObjectType(tipoObjeto);
    res.status(204).json({ message: "Se elimino el Tipo Objeto con exito" });
  } catch (error) {
    next(error);
  }
};

export const getObjectTypeHandler = async (req, res, next) => {
  const tipoObjeto = req.tipoObjeto;
  try {
    const tipoOb = tipoObjeto;
    res.status(200).json(tipoOb);
  } catch (error) {
    next(error);
  }
};

export const getObjectTypesHandler = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const tipoObjeto = await getObjectTypes(page, size);
    res.status(200).json(tipoObjeto);
  } catch (error) {
    next(error);
  }
};
