const mysql = require('mysql2');
require('dotenv').config();

// Creamos un "pool" de conexiones (es más eficiente que una sola conexión)
const pool = mysql.createPool({
    host: '162.241.60.213',
    user: 'jesushe2_jeduardo',
    password: 'M_spiWlPRo3A',
    database: 'jesushe2_jeduardo',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convertimos a promesas para poder usar async/await más tarde (es más moderno y limpio)
const promisePool = pool.promise();

console.log("Configuración de BD cargada. Intentando conectar...");

module.exports = promisePool;