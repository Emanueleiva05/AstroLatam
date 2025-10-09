import { Router } from "express";
import {
  SetProvincia,
  UpdateProvincia,
  DeleteProvincia,
  ReadProvinciaEspecifico,
  ReadProvincias,
} from "../controllers/ProvinciaController.js";

const router = Router();

router.post("/", SetProvincia);

router.put("/:id", UpdateProvincia);

router.delete("/:id", DeleteProvincia);

router.get("/", ReadProvincias);

router.get("/:id", ReadProvinciaEspecifico);

export default router;
