import {
  AgregarCiudad,
  ListarCiudades,
  ModificarCiudad,
  EliminarCiudad,
} from "../service/CiudadService.js";

export const SetCiudad = async (req, res, next) => {
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

export const UpdateCiudad = async (req, res, next) => {
  const ciudad = req.ciudad;
  const { nombre, idProvincia } = req.body;
  try {
    await ModificarCiudad(ciudad, nombre, idProvincia);
    res.status(200).json({
      message: "Se modifico el Ciudad con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteCiudad = async (req, res, next) => {
  const ciudad = req.ciudad;
  try {
    await EliminarCiudad(ciudad);
    res.status(200).json({
      message: "Se elimino el Ciudad con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadCiudades = async (req, res, next) => {
  try {
    const ciudades = await ListarCiudades();
    res.status(200).json(ciudades);
  } catch (error) {
    next(error);
  }
};

export const ReadCiudadEspecifico = async (req, res, next) => {
  const ciudad = req.ciudad;
  try {
    const ciu = ciudad;
    res.status(200).json(ciu);
  } catch (error) {
    next(error);
  }
};
