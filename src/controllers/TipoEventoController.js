import {
  AgregarTipoEvento,
  ListarTipoEventoEspecifico,
  ListarTipoEventos,
  ModificarTipoEvento,
  EliminarTipoEvento,
} from "../service/TipoEventoService.js";

export const SetTipoEvento = async (req, res) => {
  const { nombre } = req.body;
  try {
    await AgregarTipoEvento(nombre);
    res.status(200).json({
      message: "Se agrego el TipoEvento con exito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de agregar un TipoEvento",
    });
  }
};

export const UpdateTipoEvento = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await ModificarTipoEvento(await ListarTipoEventoEspecifico(id), nombre);
    res.status(200).json({
      message: "Se modifico el TipoEvento con exito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de modificar un TipoEvento",
    });
  }
};

export const DeleteTipoEvento = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarTipoEvento(await ListarTipoEventoEspecifico(id));
    res.status(200).json({
      message: "Se elimino el TipoEvento con exito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de eliminar un TipoEvento",
    });
  }
};

export const ReadTiposEvento = async (req, res) => {
  try {
    const TiposEventos = await ListarTipoEventos();
    res.status(200).json(TiposEventos);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de eliminar un TipoEvento",
    });
  }
};

export const ReadTipoEvento = async (req, res) => {
  const { id } = req.params;
  try {
    const TiposEvento = await ListarTipoEventoEspecifico(id);
    res.status(200).json(TiposEvento);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error a la hora de eliminar un TipoEvento",
    });
  }
};
