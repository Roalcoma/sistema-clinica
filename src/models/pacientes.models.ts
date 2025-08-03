import { Database } from "../config/db.js";

export class pacientesModels {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    // Método para obtener pacientes
    public async getPacientes(idPaciente?: number): Promise<any> {
        let connection = await this.db.poolInstance.getConnection();
        try {
        let query = 'SELECT * FROM pacientes WHERE descatalogado = "F"';
            if (idPaciente) {
                query += ' AND id_paciente = ?';
                const [rows] = await connection.query(query, [idPaciente]);
                return rows;
            } else {
                const [rows] = await connection.query(query);
                return rows;
            }
        } catch (error) {
            console.error('Error al obtener pacientes:', error);
            throw error;
        } finally {
            this.db.poolInstance.releaseConnection(connection);
        }
    }
    
    public async postPacientes(paciente: any): Promise<any> {
        let connection = await this.db.poolInstance.getConnection();
        try {
            console.log('Datos recibidos para crear paciente:', paciente);

            const query = 'INSERT INTO pacientes SET ?';
            const [result] = await connection.query(query, paciente);
            return result;
        } catch (error) {
            console.error('Error al crear paciente:', error);
            throw error;
        } finally {
            this.db.poolInstance.releaseConnection(connection);
        }
    }

    public async putPacientes(idPaciente: number, paciente: any): Promise<any> {
        let connection = await this.db.poolInstance.getConnection();
        try {
            const query = 'UPDATE pacientes SET ? WHERE id_paciente = ?';
            const [result] = await connection.query(query, [paciente, idPaciente]);
            return result;
        } catch (error) {
            console.error('Error al actualizar paciente:', error);
            throw error;
        } finally {
            this.db.poolInstance.releaseConnection(connection);
        }
    }

    public async softDeletePacientes(idPaciente: number): Promise<any> {
        let connection = await this.db.poolInstance.getConnection();
        try {
            const query = 'UPDATE pacientes SET descatalogado = "T" WHERE id_paciente = ?';
            const [result] = await connection.query(query, [idPaciente]);
            return result;
        } catch (error) {
            console.error('Error al eliminar paciente:', error);
            throw error;
        } finally {
            this.db.poolInstance.releaseConnection(connection);
        }
    }


}