import { Router } from "express";
import {
  DeleteTipoAdjunto,
  ReadTipoAdjunto,
  ReadTiposAdjuntos,
  SetTipoAdjunto,
  UpdateTipoAdjunto,
} from "../controllers/TipoAdjuntoController.js";

const router = Router();

router.post("/", SetTipoAdjunto);

router.put("/:id", UpdateTipoAdjunto);

router.delete("/:id", DeleteTipoAdjunto);

router.get("/", ReadTiposAdjuntos);

router.get("/:id", ReadTipoAdjunto);

export default router;
