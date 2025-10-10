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
    res.status(400).json({
      message: "Hubo un error a la hora de agregar un Ciudad",
    });
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
    res.status(400).json({
      message: "Hubo un error a la hora de modificar un Ciudad",
    });
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
    res.status(400).json({
      message: "Hubo un error a la hora de eliminar un Ciudad",
    });
  }
};

export const ReadCiudades = async (req, res) => {
  try {
    const ciudades = await ListarCiudades();
    res.status(200).json(ciudades);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de eliminar un Ciudad",
    });
  }
};

export const ReadCiudadEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const ciudad = await ListarCiudadEspecifico(id);
    res.status(200).json(ciudad);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de eliminar un Ciudad",
    });
  }
};
