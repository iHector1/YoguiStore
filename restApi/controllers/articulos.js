const articuloCtrl = {};

const pool = require('../src/database');

articuloCtrl.createArticulo = async (req, res) => {
    const { id_modelo, id_marca, id_talla, nombre, imagen, stock, precio } = req.body;
    await pool.query(`INSERT INTO articulo(id_modelo, id_marca, id_talla,nombre,imagen,stock,precio) value (?,?,?,?,?,?,?)`, [id_modelo, id_marca, id_talla, nombre, imagen, stock, precio], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.send({ message: 'Error al insertar en la tabla', err: err })
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
    const { id_marca, id_modelo, precio, id_talla, stock, imagen } = req.body;
    const { id } = req.params;
    await pool.query(`UPDATE articulo SET precio=?,id_talla=?,stock=?,id_marca=?,id_modelo=?,imagen=? WHERE id_articulo=?`, [precio, id_talla, stock, id_marca, id_modelo, imagen, id], (err, rows, fields) => {
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
articuloCtrl.deleteArticulo = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await pool.query(`delete from articulo where id_articulo=?`, [id], (err, rows, fields) => {
        if (!err) {
            res.send({ message: 'Articulo eliminado' });
        } else {
            return res.send({ message: 'Algo sucedio mal' });
        }
    });
}
articuloCtrl.getTallas = async (req, res) => {
    await pool.query(`SELECT * FROM talla`,
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
articuloCtrl.getModelo = async (req, res) => {
    await pool.query(`SELECT * FROM modelo`,
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
articuloCtrl.getMarca = async (req, res) => {
    await pool.query(`SELECT * FROM marca`,
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
articuloCtrl.getEstatus = async (req, res) => {
    await pool.query(`SELECT * FROM estatus`,
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
articuloCtrl.getPedidos = async (req, res) => {
    await pool.query(`SELECT * FROM pedido p inner join detalle_pedido d on p.id_pedido=d.no_orden inner join articulo a on a.id_articulo=d.id_articulo INNER JOIN modelo m ON m.id_modelo=a.id_modelo INNER JOIN marca mr ON mr.id_marca=a.id_marca INNER JOIN talla t ON t.id_talla=a.id_talla INNER JOIN estatus e ON e.id_estatus=p.id_estatus order by p.fecha_pedido desc, p.id_estatus desc`,
        (err, rows, fields) => {
            if (err) {
                res.send({ message: 'algo sucedio mal' });
            } else {
                let data = rows;
                return res.send(data);
            }
        });
}
articuloCtrl.setEstatus = async (req, res) => {
    const { id_estatus } = req.body;
    const { id } = req.params;
    await pool.query(`UPDATE pedido SET id_estatus=? WHERE id_pedido=?`, [id_estatus, id], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.send({ message: 'algo sucedio mal' });

        } else {
            res.send({ message: 'Articulo modificado' })
        }
    })
}
module.exports = articuloCtrl;