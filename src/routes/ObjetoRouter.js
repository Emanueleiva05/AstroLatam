import { Router } from "express";
import {
  SetObjeto,
  DeleteObjeto,
  UpdateObjeto,
  ReadObjeto,
  ReadObjetoEspecifico,
} from "../controllers/ObjetoController.js";

const router = Router();

router.post("/", SetObjeto);

router.put("/:id", UpdateObjeto);

router.delete("/:id", DeleteObjeto);

router.get("/", ReadObjeto);

router.get("/:id", ReadObjetoEspecifico);

export default router;
