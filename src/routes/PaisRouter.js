import { Router } from "express";
import {
  SetPais,
  UpdatePais,
  DeletePais,
  ReadPaisEspecifico,
  ReadPaises,
} from "../controllers/PaisController.js";
import {
  ValidarDatosPais,
  EncontrarPais,
} from "../middlewares/PaisMiddleware.js";

const router = Router();

router.post("/", ValidarDatosPais, SetPais);

router.put("/:id", EncontrarPais, ValidarDatosPais, UpdatePais);

router.delete("/:id", EncontrarPais, DeletePais);

router.get("/", ReadPaises);

router.get("/:id", EncontrarPais, ReadPaisEspecifico);

export default router;
