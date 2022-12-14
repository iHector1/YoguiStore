const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');
//se crea la coneccion con la base de datos
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXION DE LA BASE DE DATOS FUE CERRADA');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION DE LA BASE DE DATOS FUE RECHAZADA');
        }
    }
    if (connection) connection.release();
    console.log('Base de Datos Conectada');
    return;
});



//Convirtiendo a promesas lo que era callbacks 
//Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;
