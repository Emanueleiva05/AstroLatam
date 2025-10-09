import { Router } from "express";
import {
  SetUsuario,
  UpdateUsuario,
  DeleteUsuario,
  ReadUsuario,
  ReadUsuarioEspecifico,
} from "../controllers/UsuarioController.js";

const router = Router();

router.post("/", SetUsuario);

router.put("/:id", UpdateUsuario);

router.delete("/:id", DeleteUsuario);

router.get("/", ReadUsuario);

router.get("/:id", ReadUsuarioEspecifico);

export default router;
