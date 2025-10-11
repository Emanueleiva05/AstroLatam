import {
  AgregarPais,
  EliminarPais,
  ModificarPais,
  ListarPaisEspecifico,
  ListarPaises,
} from "../service/PaisService.js";

export const SetPais = async (req, res) => {
  const { nombre } = req.body;
  try {
    await AgregarPais(nombre);
    res.status(200).json({
      message: "Se agrego el Pais con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdatePais = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await ModificarPais(await ListarPaisEspecifico(id), nombre);
    res.status(200).json({
      message: "Se modifico el Pais con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const DeletePais = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarPais(await ListarPaisEspecifico(id));
    res.status(200).json({
      message: "Se elimino el Pais con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadPaises = async (req, res) => {
  try {
    const paises = await ListarPaises();
    res.status(200).json(paises);
  } catch (error) {
    next(error);
  }
};

export const ReadPaisEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const pais = await ListarPaisEspecifico(id);
    res.status(200).json(pais);
  } catch (error) {
    next(error);
  }
};
