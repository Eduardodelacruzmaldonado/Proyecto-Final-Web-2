var express = require('express');
var router = express.Router();
const db = require('../db/database'); // Importamos la conexión

/* GET home page (Listar Productos) */
router.get('/', async function(req, res, next) {
    try {
        // 1. Pedimos todos los productos a la Base de Datos
        const [resultados] = await db.query('SELECT * FROM productos');

        // 2. Renderizamos la vista 'index' pasándole los datos
        res.render('index', {
            title: 'Inventario',
            productos: resultados
        });
    } catch (error) {
        next(error);
    }
});
/* GET: Mostrar formulario de crear */
router.get('/crear', function(req, res) {
    res.render('crear', { title: 'Nuevo Producto' });
});

/* POST: Recibir datos y guardar en BD */
router.post('/guardar', async function(req, res, next) {
    try {
        // 1. Extraemos los datos del cuerpo de la petición (req.body)
        const { nombre, descripcion, precio, stock } = req.body;

        // 2. Insertamos en la Base de Datos
        await db.query('INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, precio, stock]);

        // 3. Redirigimos al usuario a la lista principal
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.send("Error al guardar el producto");
    }
});
/* --- ELIMINAR (Delete) --- */
router.get('/eliminar/:id', async function(req, res) {
    const id = req.params.id;
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
    res.redirect('/');
});

/* --- EDITAR (Update) - Paso 1: Mostrar formulario --- */
router.get('/editar/:id', async function(req, res) {
    const id = req.params.id;
    // Buscamos solo el producto que queremos editar
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);

    res.render('editar', {
        title: 'Editar Producto',
        producto: rows[0] // Pasamos el primer (y único) resultado a la vista
    });
});

/* --- EDITAR (Update) - Paso 2: Guardar cambios --- */
router.post('/actualizar/:id', async function(req, res) {
    const id = req.params.id;
    const { nombre, descripcion, precio, stock } = req.body;

    await db.query(
        'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?',
        [nombre, descripcion, precio, stock, id]
    );

    res.redirect('/');
});
/* --- ZONA DE VISITANTES (Separada) --- */

/* 1. GET: Mostrar SOLO el formulario de registro */
router.get('/registro', function(req, res) {
    res.render('registro', { title: 'Regístrate' });
});

/* 2. POST: Procesar el registro y mandar a la lista */
router.post('/registrar-visitante', async function(req, res) {
    const { nombre, correo } = req.body;
    const infoTecnica = req.get('User-Agent');

    await db.query(
        'INSERT INTO visitantes (nombre, correo, datos_tecnicos) VALUES (?, ?, ?)',
        [nombre, correo, infoTecnica]
    );

    // Al terminar, nos manda a la página de la lista
    res.redirect('/visitantes');
});

/* 3. GET: Mostrar SOLO la lista de usuarios */
router.get('/visitantes', async function(req, res) {
    const [rows] = await db.query('SELECT * FROM visitantes');

    // AQUÍ ESTÁ EL TRUCO: Creamos una versión "limpia" de los datos
    const visitantesLimpios = rows.map(row => ({
        ...row, // Copiamos nombre, correo, etc.
        // Creamos una nueva propiedad con la fecha bonita en español
        fecha_formateada: new Date(row.fecha_registro).toLocaleString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }));

    // Enviamos 'visitantesLimpios' en lugar de 'rows'
    res.render('visitantes', { title: 'Personal', visitantes: visitantesLimpios });
});
module.exports = router;