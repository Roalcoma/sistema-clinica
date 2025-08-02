import { Router } from "express";
import { PacientesControllers } from "../controllers/pacientes.controllers";

export const pacientesRouter = Router();

const pacientesController = new PacientesControllers();

pacientesRouter.route('/')
    .get(pacientesController.getPacientes)
    .post(pacientesController.postPacientes)
    .put(pacientesController.putPacientes)
    .delete(pacientesController.softDeletePacientes);