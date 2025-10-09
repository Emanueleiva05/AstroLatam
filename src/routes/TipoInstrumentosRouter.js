import { Router } from "express";
import {
  SetTipoInstrumento,
  DeleteTipoInstrumento,
  UpdateTipoInstrumento,
  ReadTipoInstrumento,
  ReadTipoInstrumentoEspecifico,
} from "../controllers/TipoInstrumentoController.js";

const router = Router();

router.post("/", SetTipoInstrumento);

router.put("/:id", UpdateTipoInstrumento);

router.delete("/:id", DeleteTipoInstrumento);

router.get("/", ReadTipoInstrumento);

router.get("/:id", ReadTipoInstrumentoEspecifico);

export default router;
