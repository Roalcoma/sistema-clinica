# Sistema de Gestión para Clínica 🏥

Este proyecto es un sistema web diseñado para modernizar y automatizar la gestión de pacientes y la selección de platillos en una clínica. Reemplaza el proceso manual basado en Excel por una interfaz intuitiva y centralizada, facilitando la comunicación entre el personal y la cocina.

---

## ✨ Características Principales

* **Gestión de Pacientes:** Sistema completo (CRUD - Crear, Leer, Actualizar, Eliminar) para manejar la información de los pacientes, incluyendo datos personales y fotos.
* **Selección de Menú por Horario:** Interfaz para que el personal pueda registrar la selección de platillos de cada paciente para el desayuno, almuerzo y cena.
* **Gestión de Platillos:** Permite administrar los platillos disponibles en la clínica, categorizados por horario y con descripciones detalladas.
* **Reportes para Cocina:** Genera automáticamente un listado consolidado de las selecciones de todos los pacientes para optimizar la preparación en la cocina.

---

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js, Express, TypeScript
* **Base de Datos:** MySQL (o MariaDB)
* **Herramientas de Desarrollo:** Nodemon, ts-node
* **Seguridad y Middlewares:** Helmet, CORS, Morgan, Dotenv

---

## 🚀 Puesta en Marcha

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### **Prerrequisitos**

* Node.js (versión 20 LTS recomendada)
* Git
* Un servidor de base de datos MySQL o MariaDB

### **Instalación**

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/Roalcoma/sistema-clinica.git](https://github.com/Roalcoma/sistema-clinica.git)
    cd sistema-clinica
    ```

2.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y copia el contenido del siguiente ejemplo. Asegúrate de rellenarlo con tus credenciales de base de datos.

    ```env
    # .env.example

    # Configuración del servidor
    PORT=3000

    # Configuración de la Base de Datos
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña_secreta
    DB_DATABASE=clinica_db
    ```

4.  **Inicia el servidor en modo de desarrollo:**
    El servidor se reiniciará automáticamente con cada cambio que guardes.
    ```bash
    npm run dev
    ```
    ¡El servidor estará corriendo en `http://localhost:3000`!

---

## 📄 Documentación de la API (Ejemplo)

A continuación se describen los endpoints principales del API.

| Método | Endpoint                | Descripción                             |
| :----- | :---------------------- | :-------------------------------------- |
| `GET`  | `/api/pacientes`        | Obtiene la lista de todos los pacientes.  |
| `POST` | `/api/pacientes`        | Crea un nuevo paciente.                 |
| `GET`  | `/api/pacientes/:id`    | Obtiene un paciente por su ID.          |
| `PUT`  | `/api/pacientes/:id`    | Actualiza un paciente por su ID.        |
| `DELETE`| `/api/pacientes/:id`    | Elimina un paciente por su ID.          |

---

## 👤 Autor

* **Tu Nombre**
* **GitHub:** [@Roalcoma](https://github.com/Roalcoma)
* **LinkedIn:** [Rodrigo Cova](https://www.linkedin.com/in/rodrigo-cova-6a879a14b)

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
