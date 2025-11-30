const db = require('./db/database');

async function instalar() {
    try {
        // 1. Crear la tabla
        await db.query(`
            CREATE TABLE IF NOT EXISTS productos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT,
                precio DECIMAL(10, 2) NOT NULL,
                stock INT NOT NULL DEFAULT 0
            )
        `);
        console.log("¡Tabla 'productos' creada correctamente!");

        // 2. Insertar datos de prueba
        await db.query(`
            INSERT INTO productos (nombre, descripcion, precio, stock) 
            VALUES 
            ('Laptop Gamer', 'Procesador i7, 16GB RAM', 1500.00, 5),
            ('Mouse RGB', 'Inalámbrico con luces', 25.50, 20)
        `);
        console.log("¡Datos de prueba insertados!");

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

instalar();