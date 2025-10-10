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
    res.status(400).json({
      message: "Ocurrio un error a la hora de crear un Evento",
    });
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
    res.status(400).json({
      message: "Ocurrio un error a la hora de modificar un Evento",
    });
  }
};

export const DeleteEvento = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarEvento(await ListarEvento(id));
    res.status(200).json({ message: "Evento eliminado con exito" });
  } catch (error) {
    res.status(400).json({
      message: "Ocurrio un error a la hora de eliminar un Evento",
    });
  }
};

export const ReadEvento = async (req, res) => {
  try {
    const eventos = await ListarEventos();
    res.status(200).json(eventos);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocurrio un error a la hora de listar Evento" });
  }
};

export const ReadEventoEspecifico = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await ListarEvento(id);
    res.status(200).json(evento);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocurrio un error a la hora de listar Evento" });
  }
};
