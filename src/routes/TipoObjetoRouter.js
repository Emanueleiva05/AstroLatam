import { Router } from "express";
import {
  SetTipoObjeto,
  UpdateTipoObjeto,
  DeleteTipoObjeto,
  ReadTipoObjeto,
  ReadTipoObjetoEspecifico,
} from "../controllers/TipoObjetoController.js";

const router = Router();

router.post("/", SetTipoObjeto);

router.put("/:id", UpdateTipoObjeto);

router.delete("/:id", DeleteTipoObjeto);

router.get("/", ReadTipoObjeto);

router.get("/:id", ReadTipoObjetoEspecifico);

export default router;
