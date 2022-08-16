const { Router } = require('express');

const router = Router();

const usuarioCtrl = require('../controllers/usuario');
//login de usuarios
router.post('/usuario/login', usuarioCtrl.loginUsuarios);
//tomar un usuario
router.get('/usuario/:id', usuarioCtrl.getUsuario);
//crear un empleado
router.post('/usuario/empleado', usuarioCtrl.createEmpleado);
//Leer empleados
router.get('/usuarios/empleados', usuarioCtrl.getEmpleados);
//actualizar correo y contrasena de un usuario
router.put('/usuario/:id', usuarioCtrl.updateUsuario);
//crear cuenta de cliente
router.post('/usuario/cliente', usuarioCtrl.createCliente);
module.exports = router;