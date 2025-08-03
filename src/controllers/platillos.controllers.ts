import { Request, Response } from "express";
import { PlatillosModels } from "../models/platillos.models";

export class PlatillosControllers {
    private models: PlatillosModels;

    constructor() {
        this.models = new PlatillosModels();

        this.getPlatillos = this.getPlatillos.bind(this);

        this.postPlatillos = this.postPlatillos.bind(this);

        this.putPlatillos = this.putPlatillos.bind(this);

        this.softDeletePlatillos = this.softDeletePlatillos.bind(this);
    }

    async getPlatillos(req: Request, res: Response): Promise<void> {
        try {
            const id_platillo = req.query.id_platillo ? Number(req.query.id_platillo) : undefined;

            const platillos = await this.models.getPlatillos(id_platillo);
            res.status(200).json({
                message: "Platillos obtenidos correctamente.",
                platillos: platillos
            });
        } catch (error) {
            console.error('Error al obtener platillos:', error);
            res.status(500).json({ error: 'Error al obtener platillos.' });
        }
    }

    async postPlatillos(req: Request, res: Response): Promise<void> {
        try {
            const platillo = req.body;

            console.log('Datos recibidos para crear platillo:', platillo);

            if (!platillo || Object.keys(platillo).length === 0) {
                res.status(400).json({ error: 'Datos del platillo son requeridos.' });
                return;
            }

            const postPlatillo = await this.models.postPlatillos(platillo);

            res.status(201).json({
                message: 'Platillo creado correctamente.',
                result: postPlatillo
            });
        } catch (error) {
            console.error('Error al crear platillo:', error);
            res.status(500).json({ error: 'Error al crear platillo.' });
        }
    }

    async putPlatillos(req: Request, res: Response): Promise<void> {
        try {
            const { id_platillo } = req.body;
            const platilloData = req.body;

            if (!id_platillo || !platilloData) {
                res.status(400).json({ error: 'ID del platillo y datos son requeridos.' });
                return;
            }

            const accion = await this.models.putPlatillos(Number(id_platillo), platilloData);

            console.log('resultado:', accion);

            res.status(200).json({
                message: 'Platillo actualizado correctamente.',
                id: id_platillo,
                data: platilloData
            });

        } catch (error) {
            console.error('Error al actualizar platillo:', error);
            res.status(500).json({ error: 'Error al actualizar platillo.' });
        }
    }

    async softDeletePlatillos(req: Request, res: Response): Promise<void> {
        try {
            const { id_platillo } = req.query;

            if (!id_platillo) {
                res.status(400).json({ error: 'ID del platillo es requerido.' });
                return;
            }

            const accion = await this.models.softDeletePlatillos(Number(id_platillo));

            console.log('resultado:', accion);

            res.status(200).json({
                message: 'Platillo eliminado correctamente.',
                id: id_platillo
            });

        } catch (error) {
            console.error('Error al eliminar platillo:', error);
            res.status(500).json({ error: 'Error al eliminar platillo.' });
        }
    }
}