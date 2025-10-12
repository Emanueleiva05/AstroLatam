import { Router } from "express";
import {
  SetTipoCondicion,
  DeleteTipoCondicion,
  UpdateTipoCondicion,
  ReadTipoCondicion,
  ReadTiposCondiciones,
} from "../controllers/TipoCondicionController.js";
import {
  ValidarDatosTiposCondicion,
  EncontrarTipoCondicion,
} from "../middlewares/TipoCondicionMiddleware.js";

const router = Router();

router.post("/", ValidarDatosTiposCondicion, SetTipoCondicion);

router.put(
  "/:id",
  EncontrarTipoCondicion,
  ValidarDatosTiposCondicion,
  UpdateTipoCondicion
);

router.delete("/:id", EncontrarTipoCondicion, DeleteTipoCondicion);

router.get("/", ReadTiposCondiciones);

router.get("/:id", EncontrarTipoCondicion, ReadTipoCondicion);

export default router;
