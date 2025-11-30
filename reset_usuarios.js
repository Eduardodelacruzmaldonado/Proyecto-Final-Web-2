const db = require('./db/database');

async function limpiar() {
    try {
        // Borra todos los datos y reinicia el contador de ID
        await db.query('TRUNCATE TABLE visitantes');

        console.log("¡Tabla de visitantes vaciada correctamente!");
        console.log("Ahora está lista para recibir usuarios reales.");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

limpiar();