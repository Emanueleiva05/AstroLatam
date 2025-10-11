import {
  AgregarEvento,
  EliminarEvento,
  ModificarEvento,
  ListarEvento,
  ListarEventos,
} from "../service/EventoService.js";

export const SetEvento = async (req, res) => {
  const {
    nombre,
    descripcion,
    horaInicio,
    horaFin,
    fechaInicio,
    fechaFin,
    idTipoEvento,
  } = req.body;
  try {
    await AgregarEvento(
      nombre,
      descripcion,
      horaInicio,
      horaFin,
      fechaInicio,
      fechaFin,
      idTipoEvento
    );
    res.status(200).json({ message: "Evento creado con exito" });
  } catch (error) {
    next(error);
  }
};

export const UpdateEvento = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    horaInicio,
    horaFin,
    fechaInicio,
    fechaFin,
    idTipoEvento,
  } = req.body;

  try {
    await ModificarEvento(
      await ListarEvento(id),
      nombre,
      descripcion,
      horaInicio,
      horaFin,
      fechaInicio,
      fechaFin,
      idTipoEvento
    );
    res.status(200).json({ message: "Evento modificado con exito" });
  } catch (error) {
    next(error);
  }
};

export const DeleteEvento = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarEvento(await ListarEvento(id));
    res.status(200).json({ message: "Evento eliminado con exito" });
  } catch (error) {
    next(error);
  }
};

export const ReadEvento = async (req, res) => {
  try {
    const eventos = await ListarEventos();
    res.status(200).json(eventos);
  } catch (error) {
    next(error);
  }
};

export const ReadEventoEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await ListarEvento(id);
    res.status(200).json(evento);
  } catch (error) {
    next(error);
  }
};
