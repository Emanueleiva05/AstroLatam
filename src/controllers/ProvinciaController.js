import {
  AgregarProvincia,
  ListarProvinciaEspecifico,
  ListarProvincias,
  EliminarProvincia,
  ModificarProvincia,
} from "../service/ProvinciaService.js";

export const SetProvincia = async (req, res) => {
  const { nombre, idPais } = req.body;
  try {
    await AgregarProvincia(nombre, idPais);
    res.status(200).json({
      message: "Se agrego el Provincia con exito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de agregar un Provincia",
    });
  }
};

export const UpdateProvincia = async (req, res) => {
  const { id } = req.params;
  const { nombre, idPais } = req.body;
  try {
    await ModificarProvincia(
      await ListarProvinciaEspecifico(id),
      nombre,
      idPais
    );
    res.status(200).json({
      message: "Se modifico el Provincia con exito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de modificar un Provincia",
    });
  }
};

export const DeleteProvincia = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarProvincia(await ListarProvinciaEspecifico(id));
    res.status(200).json({
      message: "Se elimino el Provincia con exito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de eliminar un Provincia",
    });
  }
};

export const ReadProvincias = async (req, res) => {
  try {
    const provincias = await ListarProvincias();
    res.status(200).json(provincias);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de listar un Provincia",
    });
  }
};

export const ReadProvinciaEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const provincia = await ListarProvinciaEspecifico(id);
    res.status(200).json(provincia);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de listar un Provincia",
    });
  }
};
