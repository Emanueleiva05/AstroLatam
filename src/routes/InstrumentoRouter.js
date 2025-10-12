import { Router } from "express";
import {
  SetInstrumento,
  UpdateInstrumento,
  DeleteInstrumento,
  ReadInstrumento,
  ReadInstrumentoEspecifico,
} from "../controllers/InstrumentoController.js";
import {
  ValidarDatosInstrumento,
  VerificarExistenciaTipoInstrumento,
  EncontrarInstrumento,
} from "../middlewares/InstrumentoMiddleware.js";

const router = Router();

router.post(
  "/",
  ValidarDatosInstrumento,
  VerificarExistenciaTipoInstrumento,
  SetInstrumento
);

router.put(
  "/:id",
  ValidarDatosInstrumento,
  VerificarExistenciaTipoInstrumento,
  EncontrarInstrumento,
  UpdateInstrumento
);

router.delete("/:id", EncontrarInstrumento, DeleteInstrumento);

router.get("/", ReadInstrumento);

router.get("/:id", EncontrarInstrumento, ReadInstrumentoEspecifico);

export default router;
