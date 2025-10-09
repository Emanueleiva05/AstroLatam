import {
  AgregarTipoInstrumento,
  ModificarTipoInstrumento,
  EliminarTipoInstrumento,
  ListarTipoInstrumentoEspecifico,
  ListarTipoInstrumentos,
} from "../service/TipoInstrumentoService.js";

export const SetTipoInstrumento = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    await AgregarTipoInstrumento(nombre, descripcion);
    res.status(200).json({ message: "Se creo el Tipo Instrumento con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la hora de crear el Tipo Instrumento",
    });
  }
};

export const UpdateTipoInstrumento = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    await ModificarTipoInstrumento(
      await ListarTipoInstrumentoEspecifico(id),
      nombre,
      descripcion
    );
    res
      .status(200)
      .json({ message: "Se modifico el Tipo Instrumento con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la hora de modificar el Tipo Instrumento",
    });
  }
};

export const DeleteTipoInstrumento = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarTipoInstrumento(await ListarTipoInstrumentoEspecifico(id));
    res
      .status(200)
      .json({ message: "Se elimino el Tipo Instrumento con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la hora de eliminar el Tipo Instrumento",
    });
  }
};

export const ReadTipoInstrumentoEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const tipoPublicacion = await ListarTipoInstrumentoEspecifico(id);
    res.status(200).json(tipoPublicacion);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la listar el Tipo Instrumento",
    });
  }
};

export const ReadTipoInstrumento = async (req, res) => {
  try {
    const tipoPublicaciones = await ListarTipoInstrumentos();
    res.status(200).json(tipoPublicaciones);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un problema a la listar el Tipo Instrumento",
    });
  }
};
