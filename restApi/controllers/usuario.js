const usuarioCtrl = {};

const pool = require('../src/database');
const res = require('express/lib/response');

//inicio de sesion de usuarios
usuarioCtrl.loginUsuarios = async (req, res) => {
    const { correo, contrasena } = req.body;
    await pool.query(`SELECT id_usuario,id_tipo_usuario FROM usuario 
    WHERE correo=? and contrasena=?`, [correo, contrasena],
        (err, rows, fields) => {
            if (err) {
                res.send({ message: 'Usuario o contrasena incorrectos' });

            }
            if (rows.length > 0) {
                console.log('1');
                let data = JSON.stringify(rows[0]);
                let id_tipo_usuario = JSON.stringify(rows[0].id_tipo_usuario);
                let id = JSON.stringify(rows[0].id_usuario);
                return res.status(200).json({ data, id_tipo_usuario, id, message: "correcto" });
            } else {
                res.send({ message: 'Usuario o contrasena incorrectos' })
            }
        });
}
//tomar un usuario
usuarioCtrl.getUsuario = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const usuario = await pool.query(`SELECT * FROM usuario u INNER JOIN tipo_usuario t on u.id_tipo_usuario = t.id_tipo_usuario and u.id_usuario = ? INNER JOIN info_usuario i ON i.id_usuario=u.id_usuario`, [id],
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
    res.json(usuario);
}
//crear empleados
usuarioCtrl.createEmpleado = async (req, res) => {
    const { contrasena, correo, apellido_materno, apellido_paterno, nombres } = req.body;
    const { estado, calle, no_exterior, colonia, cp } = req.body;
    console.log(req.body);
    await pool.query(`INSERT INTO usuario(contrasena, correo, apellido_materno, apellido_paterno, nombres,id_tipo_usuario) value ('${contrasena}','${correo}','${apellido_materno}','${apellido_paterno}','${nombres}',2)`);
    await pool.query(`INSERT INTO info_usuario (id_usuario,estado,calle,no_exterior,colonia,cp) value (LAST_INSERT_ID(),'${estado}','${calle}',${no_exterior},'${colonia}',${cp})`);
    res.json({ message: "empleado creado" });

}
//actualizar usuario
usuarioCtrl.updateUsuario = async (req, res) => {
    const { contrasena, correo } = req.body;
    const { id } = req.params;
    await pool.query(`UPDATE usuario set contrasena='${contrasena}', correo='${correo}' where id_usuario=${id}`);
    return res.json({ message: 'Usuario editado' });
}
//crear cliente
usuarioCtrl.createCliente = async (req, res) => {
    const { contrasena, correo, apellido_materno, apellido_paterno, nombres } = req.body;
    const { estado, calle, no_exterior, colonia, cp } = req.body;
    console.log(req.body);
    await pool.query(`INSERT INTO usuario(contrasena, correo, apellido_materno, apellido_paterno, nombres,id_tipo_usuario) value ('${contrasena}','${correo}','${apellido_materno}','${apellido_paterno}','${nombres}',3)`);
    await pool.query(`INSERT INTO info_usuario (id_usuario,estado,calle,no_exterior,colonia,cp) value (LAST_INSERT_ID(),'${estado}','${calle}',${no_exterior},'${colonia}',${cp})`);
    res.json({ message: "Tu cuenta ha sido creada" });
}
//tomar empleados
usuarioCtrl.getEmpleados = async (req, res) => {
    const usuario = await pool.query(`SELECT * FROM usuario u INNER JOIN tipo_usuario t WHERE u.id_tipo_usuario = t.id_tipo_usuario and t.id_tipo_usuario=2`,
        (err, rows, fields) => {
            if (err) {
                res.send({ message: 'algo sucedio mal' });

            }
            if (rows.length > 0) {
                let data = rows;
                return res.send(data);
            } else {
                res.send({ message: 'No hay empleados registrados' })
            }
        });
    res.json(usuario);
}


module.exports = usuarioCtrl;