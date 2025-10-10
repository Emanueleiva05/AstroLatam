import {
  AgregarTipoObjeto,
  ModificarTipoObjeto,
  EliminarTipoObjeto,
  ListarTipoObjetoEspecifico,
  ListarTipoObjetos,
} from "../service/TipoObjetoService.js";

export const SetTipoObjeto = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    await AgregarTipoObjeto(nombre, descripcion);
    res.status(200).json({ message: "Se creo el Tipo Objeto con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la hora de crear el Tipo Objeto",
    });
  }
};

export const UpdateTipoObjeto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    await ModificarTipoObjeto(
      await ListarTipoObjetoEspecifico(id),
      nombre,
      descripcion
    );
    res.status(200).json({ message: "Se modifico el Tipo Objeto con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la hora de modificar el Tipo Objeto",
    });
  }
};

export const DeleteTipoObjeto = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarTipoObjeto(await ListarTipoObjetoEspecifico(id));
    res.status(200).json({ message: "Se elimino el Tipo Objeto con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la hora de eliminar el Tipo Objeto",
    });
  }
};

export const ReadTipoObjetoEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoPublicacion = await ListarTipoObjetoEspecifico(id);
    res.status(200).json(tipoPublicacion);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la listar el Tipo Objeto",
    });
  }
};

export const ReadTipoObjeto = async (req, res) => {
  try {
    const tipoPublicaciones = await ListarTipoObjetos();
    res.status(200).json(tipoPublicaciones);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la listar el Tipo Objeto",
    });
  }
};
