const db = require('./db/database');

async function actualizar() {
    try {
        // Agregamos la columna 'datos_tecnicos' si no existe
        await db.query(`
            ALTER TABLE visitantes 
            ADD COLUMN datos_tecnicos VARCHAR(255) DEFAULT 'Datos Simulados'
        `);
        console.log("¡Columna para datos del navegador agregada con éxito!");
        process.exit(0);
    } catch (error) {
        // Si da error porque ya existe, no importa
        console.log("La columna probablemente ya existía o hubo un error menor.");
        console.error(error.message);
        process.exit(1);
    }
}
actualizar();