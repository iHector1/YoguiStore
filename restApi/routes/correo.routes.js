const { Router } = require('express');
const router = Router();

let correo = require('../controllers/correo');

//envio de correo 
router.post('/correo', correo.send);

module.exports = router;