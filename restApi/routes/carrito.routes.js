const { Router } = require('express');

const router = Router();
const carrito = require('../controllers/carrito');

router.get('/carrito/:id', carrito.verificationCarrito);
router.post('/carrito', carrito.createCarrito);
router.post('/articulo-carrito', carrito.insertArticuloCarrito);
router.get('/articulo-carrito/:id', carrito.getProducts);
router.delete('/articulo-carrito/:id', carrito.deleteProducts);
router.post('/pedido', carrito.createPedido);
router.delete('/articulo-pedido/:id', carrito.vaciarCarrito);
module.exports = router; 