import { Router } from "express";
import {
  SetObservacionCondiciones,
  UpdateObservacionCondiciones,
  DeleteObservacionCondiciones,
  ReadObservacionCondiciones,
  ReadObservacionCondicionesEspecifico,
} from "../controllers/ObservacionCondicionController.js";

const router = Router();

router.post("/", SetObservacionCondiciones);

router.put("/:id", UpdateObservacionCondiciones);

router.delete("/:id", DeleteObservacionCondiciones);

router.get("/", ReadObservacionCondiciones);

router.get("/:id", ReadObservacionCondicionesEspecifico);

export default router;
