import { Router } from "express";
import {
  DeletePublicacion,
  SetPublicacion,
  UpdatePublicacion,
  ReadPublicacion,
  ReadPublicacionEspecifico,
} from "../controllers/PublicacionController.js";

const router = Router();

router.post("/", SetPublicacion);

router.put("/:id", UpdatePublicacion);

router.delete("/:id", DeletePublicacion);

router.get("/", ReadPublicacion);

router.get("/:id", ReadPublicacionEspecifico);

export default router;
