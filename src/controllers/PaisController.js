import {
  AgregarPais,
  EliminarPais,
  ModificarPais,
  ListarPaises,
} from "../service/PaisService.js";

export const SetPais = async (req, res, next) => {
  const { nombre } = req.body;
  try {
    await AgregarPais(nombre);
    res.status(201).json({
      message: "Se agrego el Pais con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdatePais = async (req, res, next) => {
  const pais = req.pais;
  const { nombre } = req.body;
  try {
    await ModificarPais(pais, nombre);
    res.status(204).json({
      message: "Se modifico el Pais con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const DeletePais = async (req, res, next) => {
  const pais = req.params;
  try {
    await EliminarPais(pais);
    res.status(204).json({
      message: "Se elimino el Pais con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadPaises = async (req, res, next) => {
  try {
    const page = req.query.page;
    const size = req.query.size;

    const paises = await ListarPaises(page, size);
    res.status(200).json(paises);
  } catch (error) {
    next(error);
  }
};

export const ReadPaisEspecifico = async (req, res, next) => {
  const pais = req.params;
  try {
    const pa = pais;
    res.status(200).json(pa);
  } catch (error) {
    next(error);
  }
};
