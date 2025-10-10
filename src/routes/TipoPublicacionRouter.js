import { Router } from "express";
import {
  SetTipoPublicacion,
  UpdateTipoPublicacion,
  ReadTipoPublicacion,
  ReadTipoPublicacionEspecifico,
  DeleteTipoPublicacion,
} from "../controllers/TipoPublicacioController.js";

const router = Router();

router.post("/", SetTipoPublicacion);

router.put("/:id", UpdateTipoPublicacion);

router.delete("/:id", DeleteTipoPublicacion);

router.get("/", ReadTipoPublicacion);

router.get("/:id", ReadTipoPublicacionEspecifico);

export default router;
