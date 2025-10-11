import {
  AgregarCiudad,
  ListarCiudadEspecifico,
  ListarCiudades,
  ModificarCiudad,
  EliminarCiudad,
} from "../service/CiudadService.js";

export const SetCiudad = async (req, res) => {
  const { nombre, idProvincia } = req.body;
  try {
    await AgregarCiudad(nombre, idProvincia);
    res.status(200).json({
      message: "Se agrego el Ciudad con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateCiudad = async (req, res) => {
  const { id } = req.params;
  const { nombre, idProvincia } = req.body;
  try {
    await ModificarCiudad(
      await ListarCiudadEspecifico(id),
      nombre,
      idProvincia
    );
    res.status(200).json({
      message: "Se modifico el Ciudad con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteCiudad = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarCiudad(await ListarCiudadEspecifico(id));
    res.status(200).json({
      message: "Se elimino el Ciudad con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadCiudades = async (req, res) => {
  try {
    const ciudades = await ListarCiudades();
    res.status(200).json(ciudades);
  } catch (error) {
    next(error);
  }
};

export const ReadCiudadEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const ciudad = await ListarCiudadEspecifico(id);
    res.status(200).json(ciudad);
  } catch (error) {
    next(error);
  }
};
