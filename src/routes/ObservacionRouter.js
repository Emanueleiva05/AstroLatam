import { Router } from "express";
import {
  DeleteObservacion,
  SetObservacion,
  UpdateObservacion,
  ReadObservacion,
  ReadObservacionEspecifico,
} from "../controllers/ObservacionController.js";

const router = Router();

router.post("/", SetObservacion);

router.put("/:id", UpdateObservacion);

router.delete("/:id", DeleteObservacion);

router.get("/", ReadObservacion);

router.get("/:id", ReadObservacionEspecifico);

export default router;
