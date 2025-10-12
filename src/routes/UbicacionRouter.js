import { Router } from "express";
import {
  SetUbicacion,
  UpdateUbicacion,
  DeleteUbicacion,
  ReadUbicacion,
  ReadUbicacionEspecifico,
} from "../controllers/UbicacionController.js";
import {
  EncontrarUbicacion,
  ValidarDatosUbicacion,
  VerificarExistenciaCiudad,
} from "../middlewares/UbicacionMiddleware.js";

const router = Router();

router.post(
  "/",
  ValidarDatosUbicacion,
  VerificarExistenciaCiudad,
  SetUbicacion
);

router.put(
  "/:id",
  EncontrarUbicacion,
  ValidarDatosUbicacion,
  VerificarExistenciaCiudad,
  UpdateUbicacion
);

router.delete("/:id", EncontrarUbicacion, DeleteUbicacion);

router.get("/", ReadUbicacion);

router.get("/:id", EncontrarUbicacion, ReadUbicacionEspecifico);

export default router;
