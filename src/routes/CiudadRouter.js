import { Router } from "express";
import {
  SetCiudad,
  UpdateCiudad,
  DeleteCiudad,
  ReadCiudadEspecifico,
  ReadCiudades,
} from "../controllers/CiudadController.js";

const router = Router();

router.post("/", SetCiudad);

router.put("/:id", UpdateCiudad);

router.delete("/:id", DeleteCiudad);

router.get("/", ReadCiudades);

router.get("/:id", ReadCiudadEspecifico);

export default router;
