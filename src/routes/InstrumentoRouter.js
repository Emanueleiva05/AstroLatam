import { Router } from "express";
import {
  SetInstrumento,
  UpdateInstrumento,
  DeleteInstrumento,
  ReadInstrumento,
  ReadInstrumentoEspecifico,
} from "../controllers/InstrumentoController.js";

const router = Router();

router.post("/", SetInstrumento);

router.put("/:id", UpdateInstrumento);

router.delete("/:id", DeleteInstrumento);

router.get("/", ReadInstrumento);

router.get("/:id", ReadInstrumentoEspecifico);

export default router;
