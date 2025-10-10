import { Router } from "express";
import {
  SetEvento,
  DeleteEvento,
  UpdateEvento,
  ReadEvento,
  ReadEventoEspecifico,
} from "../controllers/EventoController.js";

const router = Router();

router.post("/", SetEvento);

router.put("/:id", UpdateEvento);

router.delete("/:id", DeleteEvento);

router.get("/", ReadEvento);

router.get("/:id", ReadEventoEspecifico);

export default router;
