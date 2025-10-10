import { Router } from "express";
import {
  SetTipoCondicion,
  DeleteTipoCondicion,
  UpdateTipoCondicion,
  ReadTipoCondicion,
  ReadTiposCondiciones,
} from "../controllers/TipoCondicionController.js";

const router = Router();

router.post("/", SetTipoCondicion);

router.put("/:id", UpdateTipoCondicion);

router.delete("/:id", DeleteTipoCondicion);

router.get("/", ReadTiposCondiciones);

router.get("/:id", ReadTipoCondicion);

export default router;
