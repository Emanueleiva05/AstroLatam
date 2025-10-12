import { Router } from "express";
import {
  DeleteObservacion,
  SetObservacion,
  UpdateObservacion,
  ReadObservacion,
  ReadObservacionEspecifico,
} from "../controllers/ObservacionController.js";
import {
  EncontrarObservacion,
  ValidarDatosObservacion,
  VerificarExistenciaUbicacion,
} from "../middlewares/ObservacionMiddleware.js";

const router = Router();

router.post(
  "/",
  ValidarDatosObservacion,
  VerificarExistenciaUbicacion,
  SetObservacion
);

router.put(
  "/:id",
  EncontrarObservacion,
  ValidarDatosObservacion,
  VerificarExistenciaUbicacion,
  UpdateObservacion
);

router.delete("/:id", EncontrarObservacion, DeleteObservacion);

router.get("/", ReadObservacion);

router.get("/:id", EncontrarObservacion, ReadObservacionEspecifico);

export default router;
