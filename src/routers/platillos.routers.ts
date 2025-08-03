import { Router } from "express";
import { PlatillosControllers } from "../controllers/platillos.controllers";

export const platillosRouter = Router();

const platillosController = new PlatillosControllers();

platillosRouter.route('/')
    .get(platillosController.getPlatillos)
    .post(platillosController.postPlatillos)
    .put(platillosController.putPlatillos)
    .delete(platillosController.softDeletePlatillos);