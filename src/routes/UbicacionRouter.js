import { Router } from "express";
import {
  SetUbicacion,
  UpdateUbicacion,
  DeleteUbicacion,
  ReadUbicacion,
  ReadUbicacionEspecifico,
} from "../controllers/UbicacionController.js";

const router = Router();

router.post("/", SetUbicacion);

router.put("/:id", UpdateUbicacion);

router.delete("/:id", DeleteUbicacion);

router.get("/", ReadUbicacion);

router.get("/:id", ReadUbicacionEspecifico);

export default router;
