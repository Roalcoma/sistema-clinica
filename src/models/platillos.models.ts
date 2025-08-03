import { Database } from "../config/db";

export class PlatillosModels {
    private db: Database;

    constructor() {
        this.db = new Database();
    }

    // Método para obtener platillos
    public async getPlatillos(idPlatillo?: number): Promise<any> {
        let connection = await this.db.poolInstance.getConnection();
        try {
            let query = 'SELECT * FROM platillos WHERE descatalogado = "F"';
            if (idPlatillo) {
                query += ' AND id_platillo = ?';
                const [rows] = await connection.query(query, [idPlatillo]);
                return rows;
            } else {
                const [rows] = await connection.query(query);
                return rows;
            }
        } catch (error) {
            console.error('Error al obtener platillos:', error);
            throw error;
        } finally {
            this.db.poolInstance.releaseConnection(connection);
        }
    }

    public async postPlatillos(platillo: any): Promise<any> {
        let connection = await this.db.poolInstance.getConnection();
        try {
            console.log('Datos recibidos para crear platillo:', platillo);

            const query = 'INSERT INTO platillos SET ?';
            const [result] = await connection.query(query, platillo);
            return result;
        } catch (error) {
            console.error('Error al crear platillo:', error);
            throw error;
        } finally {
            this.db.poolInstance.releaseConnection(connection);
        }
    }

    public async putPlatillos(idPlatillo: number, platilloData: any): Promise<any> {
        let connection = await this.db.poolInstance.getConnection();
        try {
            if (!idPlatillo || !platilloData) {
                throw new Error('ID del platillo y datos son requeridos.');
            }

            const query = 'UPDATE platillos SET ? WHERE id_platillo = ?';
            const [result] = await connection.query(query, [platilloData, idPlatillo]);
            return result;
        } catch (error) {
            console.error('Error al actualizar platillo:', error);
            throw error;
        } finally {
            this.db.poolInstance.releaseConnection(connection);
        }
    }

    public async softDeletePlatillos(idPlatillo: number): Promise<any> {
        let connection = await this.db.poolInstance.getConnection();
        try {
            if (!idPlatillo) {
                throw new Error('ID del platillo es requerido.');
            }

            const query = 'UPDATE platillos SET descatalogado = "T" WHERE id_platillo = ?';
            const [result] = await connection.query(query, [idPlatillo]);
            return result;
        } catch (error) {
            console.error('Error al eliminar platillo:', error);
            throw error;
        } finally {
            this.db.poolInstance.releaseConnection(connection);
        }
    }

}