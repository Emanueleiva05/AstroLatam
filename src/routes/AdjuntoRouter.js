import { Router } from "express";
import {
  SetAdjunto,
  DeleteAdjunto,
  UpdateAdjunto,
  ReadAdjuntoEspecifico,
  ReadAdjuntos,
} from "../controllers/AdjuntoController.js";

const router = Router();

router.post("/", SetAdjunto);

router.put("/:id", UpdateAdjunto);

router.delete("/:id", DeleteAdjunto);

router.get("/", ReadAdjuntos);

router.get("/:id", ReadAdjuntoEspecifico);

export default router;
