import {
  AgregarTipoCondicion,
  ListarTipoCondicionEspecifico,
  ListarTipoCondiciones,
  EliminarTipoCondicion,
  ModificarTipoCondicion,
} from "../service/TipoCondicionService.js";

export const SetTipoCondicion = async (req, res) => {
  const { nombre } = req.body;
  try {
    await AgregarTipoCondicion(nombre);
    res.status(200).json({
      message: "Se agrego el TipoCondicion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateTipoCondicion = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await ModificarTipoCondicion(
      await ListarTipoCondicionEspecifico(id),
      nombre
    );
    res.status(200).json({
      message: "Se modifico el TipoCondicion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTipoCondicion = async (req, res) => {
  const { id } = req.params;
  try {
    await EliminarTipoCondicion(await ListarTipoCondicionEspecifico(id));
    res.status(200).json({
      message: "Se elimino el TipoCondicion con exito",
    });
  } catch (error) {
    next(error);
  }
};

export const ReadTiposCondiciones = async (req, res) => {
  try {
    const TiposAdjuntos = await ListarTipoCondiciones();
    res.status(200).json(TiposAdjuntos);
  } catch (error) {
    next(error);
  }
};

export const ReadTipoCondicion = async (req, res) => {
  const { id } = req.params;
  try {
    const TiposAdjuntos = await ListarTipoCondicionEspecifico(id);
    res.status(200).json(TiposAdjuntos);
  } catch (error) {
    next(error);
  }
};
