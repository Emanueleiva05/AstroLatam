import {
  AgregarTipoPublicacion,
  EliminarTipoPublicacion,
  ModificarTipoPublicacion,
  ListarTipoPublicacionEspecifico,
  ListarTipoPublicaciones,
} from "../service/TipoPublicacionService.js";

export const SetTipoPublicacion = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    await AgregarTipoPublicacion(nombre, descripcion);
    res.status(200).json({ message: "Se creo el Tipo Publicacion con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la hora de crear el Tipo Publicacion",
    });
  }
};

export const UpdateTipoPublicacion = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    await ModificarTipoPublicacion(
      await ListarTipoPublicacionEspecifico(id),
      nombre,
      descripcion
    );
    res
      .status(200)
      .json({ message: "Se modifico el Tipo Publicacion con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la hora de modificar el Tipo Publicacion",
    });
  }
};

export const DeleteTipoPublicacion = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarTipoPublicacion(await ListarTipoPublicacionEspecifico(id));
    res
      .status(200)
      .json({ message: "Se elimino el Tipo Publicacion con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la hora de eliminar el Tipo Publicacion",
    });
  }
};

export const ReadTipoPublicacionEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoPublicacion = await ListarTipoPublicacionEspecifico(id);
    res.status(200).json(tipoPublicacion);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la listar el Tipo Publicacion",
    });
  }
};

export const ReadTipoPublicacion = async (req, res) => {
  try {
    const tipoPublicaciones = await ListarTipoPublicaciones();
    res.status(200).json(tipoPublicaciones);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la listar el Tipo Publicacion",
    });
  }
};
