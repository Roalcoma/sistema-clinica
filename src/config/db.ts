// src/config/db.ts

import { createPool, Pool, PoolConnection } from 'mysql2/promise';
import 'dotenv/config'; // Cargar variables de entorno desde .env

// Definimos una clase para manejar la base de datos
export class Database {
  private pool: Pool;

  constructor() {
    // Inicializamos el pool de conexiones en el constructor
    this.pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  // Método para probar la conexión al iniciar la app
  public async checkConnection(): Promise<void> {
    let connection: PoolConnection | undefined;
    try {
      connection = await this.pool.getConnection();
      console.log('✅ Conexión a la base de datos exitosa.');
    } catch (error) {
      console.error('❌ Error al conectar con la base de datos:', error);
      // Si la conexión falla, terminamos el proceso para evitar que la app corra sin DB
      process.exit(1);
    } finally {
      // Liberamos la conexión de prueba
      if (connection) connection.release();
    }
  }

  // Método para cerrar el pool de conexiones de forma ordenada
  public async closePool(): Promise<void> {
    await this.pool.end();
    console.log('Pool de conexiones cerrado.');
  }
  
  // Getter para acceder al pool desde otras partes de la aplicación
  public get poolInstance(): Pool {
    return this.pool;
  }
}