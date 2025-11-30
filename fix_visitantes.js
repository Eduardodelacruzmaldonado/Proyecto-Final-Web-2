const db = require('./db/database');

async function arreglarTodo() {
    try {
        console.log("Reiniciando tabla de visitantes...");

        // 1. Borramos la tabla por si acaso quedó mal hecha
        await db.query('DROP TABLE IF EXISTS visitantes');

        // 2. Creamos la tabla COMPLETA (con la columna datos_tecnicos incluida)
        await db.query(`
            CREATE TABLE visitantes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                correo VARCHAR(100) NOT NULL,
                datos_tecnicos VARCHAR(255) DEFAULT 'Datos Simulados',
                fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("¡Tabla creada correctamente!");

        // 3. Insertamos los 10 usuarios obligatorios
        const sql = 'INSERT INTO visitantes (nombre, correo) VALUES ?';
        const valores = [
            ['Juan Perez', 'juan@gmail.com'], ['Maria Lopez', 'maria@hotmail.com'],
            ['Carlos Ruiz', 'carlos@yahoo.com'], ['Ana Garcia', 'ana@outlook.com'],
            ['Luis Torres', 'luis@gmail.com'], ['Sofia Diaz', 'sofia@empresa.com'],
            ['Pedro Mesa', 'pedro@gmail.com'], ['Laura Vives', 'laura@studio.com'],
            ['Diego Gil', 'diego@tech.com'], ['Elena Nito', 'elena@gmail.com']
        ];

        await db.query(sql, [valores]);
        console.log("¡10 Usuarios insertados y listos!");
        process.exit(0);

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

arreglarTodo();