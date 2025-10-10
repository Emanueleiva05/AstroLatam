import { Router } from "express";
import {
  SetPais,
  UpdatePais,
  DeletePais,
  ReadPaisEspecifico,
  ReadPaises,
} from "../controllers/PaisController.js";

const router = Router();

router.post("/", SetPais);

router.put("/:id", UpdatePais);

router.delete("/:id", DeletePais);

router.get("/", ReadPaises);

router.get("/:id", ReadPaisEspecifico);

export default router;
