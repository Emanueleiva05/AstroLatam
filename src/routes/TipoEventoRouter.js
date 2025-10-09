import { Router } from "express";
import {
  SetTipoEvento,
  DeleteTipoEvento,
  UpdateTipoEvento,
  ReadTipoEvento,
  ReadTiposEvento,
} from "../controllers/TipoEventoController.js";

const router = Router();

router.post("/", SetTipoEvento);

router.put("/:id", UpdateTipoEvento);

router.delete("/:id", DeleteTipoEvento);

router.get("/", ReadTiposEvento);

router.get("/:id", ReadTipoEvento);

export default router;
