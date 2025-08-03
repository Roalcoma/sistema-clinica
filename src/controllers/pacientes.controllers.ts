import {Request, Response} from 'express';
import { pacientesModels } from '../models/pacientes.models';
import { console } from 'inspector';

export class PacientesControllers {
    private models: pacientesModels;

    constructor() {
        this.models = new pacientesModels();

        this.getPacientes = this.getPacientes.bind(this);

        this.postPacientes = this.postPacientes.bind(this);

        this.putPacientes = this.putPacientes.bind(this);

        this.softDeletePacientes = this.softDeletePacientes.bind(this);
    }

    async getPacientes(req: Request, res: Response): Promise<void> {
        try {
            let {id_paciente} = req.query;
            
            let pacientes;

            if(!id_paciente) {
                pacientes = await this.models.getPacientes() // Si no se proporciona, lo dejamos como undefined
            } else {
                // Convertimos el id_paciente a número si es que se proporciona
                pacientes = await this.models.getPacientes(Number(id_paciente));
            }
            
            // Aquí iría la lógica para obtener los pacientes de la base de datos
            res.status(200).json({
                message: 'Pacientes obtenidos correctamente.',
                pacientes: pacientes
            });

        } catch (error) {
            console.error('Error al obtener pacientes:', error);
            res.status(500).json({ error: 'Error al obtener pacientes.' });
        }
    }

    async postPacientes(req: Request, res: Response): Promise<void> {
        try {
            const paciente = req.body;

            console.log('Datos recibidos para crear paciente:', paciente);

            if (!paciente || Object.keys(paciente).length === 0) {
                res.status(400).json({ error: 'Datos del paciente son requeridos.' });
                return;
            }

            const postPaciente = await this.models.postPacientes(paciente);

            res.status(201).json({
                message: 'Paciente creado correctamente.',
                result: postPaciente
            });
        } catch (error) {
            console.error('Error al crear paciente:', error);
            res.status(500).json({ error: 'Error al crear paciente.' });
        }
    }

    async putPacientes(req: Request, res: Response): Promise<void> {
        try {
            const { id_paciente } = req.body;
            const pacienteData = req.body;

            if (!id_paciente || !pacienteData) {
                res.status(400).json({ error: 'ID del paciente y datos son requeridos.' });
                return;
            }

            const accion = await this.models.putPacientes(Number(id_paciente), pacienteData);

            console.log('resultado:', accion);

            res.status(200).json({
                message: 'Paciente actualizado correctamente.',
                id: id_paciente,
                data: pacienteData
            });


        } catch (error) {
            console.error('Error al actualizar paciente:', error);
            res.status(500).json({ error: 'Error al actualizar paciente.' });
        }
    }

    async softDeletePacientes(req: Request, res: Response): Promise<void> {
        console.log('Iniciando softDeletePacientes...');
        try {
            const { id_paciente } = req.query;

            console.log('ID del paciente a eliminar:', id_paciente);

            if (!id_paciente) {
                res.status(400).json({ error: 'ID del paciente es requerido.' });
                return;
            }

            const accion = await this.models.softDeletePacientes(Number(id_paciente));

            console.log('resultado:', accion);

            if (accion.affectedRows === 0) {
                res.status(404).json({ error: 'Paciente no encontrado.' });
                return;
            }

            res.status(200).json({
                message: 'Paciente eliminado correctamente.',
                id: id_paciente,
                data: accion
            });

        } catch (error: any) {
            console.error('Error al eliminar paciente:', error);
            res.status(500).json({ error: 'Error al eliminar paciente.', details: error.message });
        }
    }
}