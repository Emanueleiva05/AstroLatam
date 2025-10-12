import { Router } from "express";
import {
  SetProvincia,
  UpdateProvincia,
  DeleteProvincia,
  ReadProvinciaEspecifico,
  ReadProvincias,
} from "../controllers/ProvinciaController.js";

import {
  EncontrarProvincia,
  ValidarDatosProvincia,
  VerificarExistenciaPais,
} from "../middlewares/ProvinciaMiddleware.js";

const router = Router();

router.post("/", ValidarDatosProvincia, VerificarExistenciaPais, SetProvincia);

router.put(
  "/:id",
  EncontrarProvincia,
  ValidarDatosProvincia,
  VerificarExistenciaPais,
  UpdateProvincia
);

router.delete("/:id", EncontrarProvincia, DeleteProvincia);

router.get("/", ReadProvincias);

router.get("/:id", EncontrarProvincia, ReadProvinciaEspecifico);

export default router;
