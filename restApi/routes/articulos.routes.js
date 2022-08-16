const { Router } = require('express');

const router = Router();

const articulos = require('../controllers/articulos');

//crear articulos
router.post('/articulo', articulos.createArticulo);
//ver articulo
router.get('/articulo/:id', articulos.getArticulo);
//actualizar articulo empleado
router.put('/articulo/empleado/:id', articulos.updateArticuloEmpleado);
//actualizar articulo cliente
router.put('/articulo/cliente/:id', articulos.updateArticuloCliente);
//arituculos
router.get('/articulos', articulos.getArticulos);

module.exports = router;