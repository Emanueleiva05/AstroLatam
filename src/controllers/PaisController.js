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
    res.status(400).json({
      message: "Hubo un error a la hora de agregar un Pais",
    });
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
    res.status(400).json({
      message: "Hubo un error a la hora de modificar un Pais",
    });
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
    res.status(400).json({
      message: "Hubo un error a la hora de eliminar un Pais",
    });
  }
};

export const ReadPaises = async (req, res) => {
  try {
    const paises = await ListarPaises();
    res.status(200).json(paises);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de eliminar un Pais",
    });
  }
};

export const ReadPaisEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const pais = await ListarPaisEspecifico(id);
    res.status(200).json(pais);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de eliminar un Pais",
    });
  }
};
