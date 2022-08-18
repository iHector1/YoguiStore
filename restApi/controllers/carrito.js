const carritoCtrl = {};

const pool = require('../src/database');

carritoCtrl.verificationCarrito = async (req, res) => {
    const { id } = req.params;
    await pool.query(`SELECT * FROM carrito where id_usuario=?`, [id],
        (err, rows, fields) => {
            if (err) {
                res.send({ message: 'algo sucedio mal' });

            }
            if (rows.length > 0) {

                let data = rows[0];
                return res.send(data);
            } else {
                res.send({ message: 0 })
            }
        });
}
carritoCtrl.createCarrito = async (req, res) => {
    const { id } = req.body;
    await pool.query(`Insert into carrito(id_usuario,precio_total) value (?,0)`, [id], (err, rows, fields) => {
        if (err) {
            res.send({ message: 'algo sucedio mal' });

        } else {
            res.send({ message: 'carrito creado' })
        }
    })
}

carritoCtrl.insertArticuloCarrito = async (req, res) => {
    const { id_articulo, id_carrito, total } = req.body;
    await pool.query(`Insert into articulo_carrito(id_carrito,id_articulo,total_articulo,cantidad_articulos) value (?,?,?,1)`, [id_carrito, id_articulo, total], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.send({ message: 'algo sucedio mal' });

        } else {
            res.send({ message: 'Articulo agregado' });
        }
    })
}
carritoCtrl.getProducts = async (req, res) => {
    const { id } = req.params;
    await pool.query(`Select * from articulo_carrito ac Inner join articulo a on ac.id_articulo=a.id_articulo INNER JOIN modelo m ON m.id_modelo=a.id_modelo INNER JOIN marca mr ON mr.id_marca=a.id_marca INNER JOIN talla t ON t.id_talla=a.id_talla where ac.id_carrito=?`, [id], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.send({ message: 'algo sucedio mal' });

        } else {
            let data = rows;
            res.send(rows);
        }
    })
}
carritoCtrl.deleteProducts = async (req, res) => {
    const { id } = req.params;
    await pool.query(`Delete from articulo_carrito where id_seleccion=?`, [id], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.send({ message: 'algo sucedio mal' });

        } else {
            let data = rows;
            res.send({ message: 'Articulo eliminado del carrito' });
        }
    })
}
carritoCtrl.createPedido = async (req, res) => {
    const { id_articulo, id_usuario, precio_total, cant_articulos, fecha_pedido, id_pedido, total_articulo } = req.body;
    await pool.query(`Insert into pedido(id_pedido,id_usuario,cantidad_articulos,precio_total,fecha_pedido,id_estatus) value (?,?,?,?,CURRENT_TIMESTAMP(),1)`, [id_pedido, id_usuario, cant_articulos, precio_total]);
    await pool.query(`Insert into detalle_pedido(no_orden,id_articulo,total_articulo) value (?,?,?)`, [id_pedido, id_articulo, total_articulo]);
    res.send({ message: "ok" });
}
carritoCtrl.vaciarCarrito = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await pool.query(`Delete from articulo_carrito where id_seleccion=?`, [id], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.send({ message: 'algo sucedio mal' });

        } else {
            let data = rows;
            res.send({ message: 'Articulo eliminado del carrito' });
        }
    })
}
module.exports = carritoCtrl;  