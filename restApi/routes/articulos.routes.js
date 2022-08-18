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
//modelos
router.get('/modelos', articulos.getModelo);
//tallas
router.get('/tallas', articulos.getTallas);
//marca
router.get('/marcas', articulos.getMarca);
//eliminar articulo
router.delete('/articulo/:id', articulos.deleteArticulo);
//
router.get('/pedidos', articulos.getPedidos);

router.get('/estatus', articulos.getEstatus);
router.put('/estatus/:id', articulos.setEstatus);
module.exports = router;