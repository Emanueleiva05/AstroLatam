import { Router } from "express";
import {
  SetAccionUsuario,
  UpdateAccionUsuario,
  DeleteAccionUsuario,
  ReadAccionUsuario,
  ReadAccionUsuarioEspecifico,
} from "../controllers/AccionUsuarioController.js";

const router = Router();

router.post("/", SetAccionUsuario);

router.put("/:id", UpdateAccionUsuario);

router.delete("/:id", DeleteAccionUsuario);

router.get("/", ReadAccionUsuario);

router.get("/:id", ReadAccionUsuarioEspecifico);

export default router;
