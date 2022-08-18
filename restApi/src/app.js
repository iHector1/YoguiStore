const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();


//Enviroment Variables
app.set('port', process.env.port || 4000);
// app.use(cors({origin: "http://localhost:4200"})); //Recibir Peticiones exclusivamente de angular
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('', require('../routes/usuario.routes'));
app.use('', require('../routes/articulos.routes'));
app.use('', require('../routes/correo.routes'));
app.use('', require('../routes/carrito.routes'));
module.exports = app; 