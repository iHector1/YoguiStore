const articuloCtrl = {};

const pool = require('../src/database');

articuloCtrl.createArticulo = async (req, res) => {
    const { id_modelo, id_marca, id_talla, nombre, imagen, stock, precio } = req.body;
    await pool.query(`INSERT INTO articulo(id_modelo, id_marca, id_talla,nombre,imagen,stock,precio) value (?,?,?,?,?,?,?)`, [id_modelo, id_marca, id_talla, nombre, imagen, stock, precio], (err, rows, fields) => {
        if (err) {
            res.send({ message: 'Error al insertar en la tabla' })
        } else {
            res.send({ message: 'Articulo creado' })
        }
    })
}
articuloCtrl.getArticulos = async (req, res) => {
    await pool.query(`SELECT * FROM articulo a INNER JOIN modelo m ON m.id_modelo=a.id_modelo INNER JOIN marca mr ON mr.id_marca=a.id_marca INNER JOIN talla t ON t.id_talla=a.id_talla`,
        (err, rows, fields) => {
            if (err) {
                res.send({ message: 'algo sucedio mal' });
            }
            if (rows.length > 0) {
                let data = rows;
                return res.send(data);
            } else {
                res.send({ message: 'Usuario o contrasena incorrectos' })
            }
        });

}
articuloCtrl.getArticulo = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await pool.query(`SELECT * FROM articulo a INNER JOIN modelo m ON m.id_modelo=a.id_modelo INNER JOIN marca mr ON mr.id_marca=a.id_marca INNER JOIN talla t ON t.id_talla=a.id_talla WHERE a.id_articulo=?`, [id],
        (err, rows, fields) => {
            if (err) {
                res.send({ message: 'algo sucedio mal' });

            }
            if (rows.length > 0) {
                let data = rows[0];
                return res.send(data);
            } else {
                res.send({ message: 'Usuario o contrasena incorrectos' })
            }
        });

}

articuloCtrl.updateArticuloEmpleado = async (req, res) => {
    const { precio, id_talla, stock } = req.body;
    const { id } = req.params;
    await pool.query(`UPDATE articulo SET precio=?,id_talla=?,stock=? WHERE id_articulo=?`, [precio, id_talla, stock, id], (err, rows, fields) => {
        if (err) {
            res.send({ message: 'algo sucedio mal' });

        } else {
            res.send({ message: 'Articulo editado' })
        }
    })
}
articuloCtrl.updateArticuloCliente = async (req, res) => {
    const { stock } = req.body;
    const { id } = req.params;
    await pool.query(`UPDATE articulo SET stock=? WHERE id_articulo=?`, [stock, id], (err, rows, fields) => {
        if (err) {
            res.send({ message: 'algo sucedio mal' });

        } else {
            res.send({ message: 'Articulo editado' })
        }
    })

}

module.exports = articuloCtrl;