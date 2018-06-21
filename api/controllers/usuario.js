'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var jwt = require('../services/jwt');

//Modelos necesarios para el controlador
var Usuario = require('../models/usuario');

function pruebaUsuario(req, res) {
    res.status(200).send({
        message: 'El controlador de pruebas enlaza correctamente'
    });
};

/* ------------------------------ INICIO DE LOS METODOS ------------------------------*/

//Metodo para realizar el registro
function guardarUsuario(req, res) {
    var params = req.body;
    var user = new Usuario();

    if (params.nombre && params.apellido && params.usuario && params.contrasena && params.email) {
        user.nombre = params.nombre;
        user.apellido = params.apellido;
        user.usuario = params.usuario;
        user.email = params.email;
        user.rol = 'ROLE_USER';
        user.departamento_seccion = params.departamento_seccion;
        user.image = null;

        bcrypt.hash(params.contrasena, null, null, (err, hash) => {
            user.contrasena = hash;
            user.save((err, userStored) => {
                if (err) return res.status(500).send({ message: 'Error: No se pudo guardar el usuario' });

                if (userStored) {
                    res.status(200).send({ user: userStored });
                } else {
                    res.status(404).send({ message: 'Error: No se ha registrado el usuario' })
                }

            });
        });

    } else {
        res.status(200).send({
            message: 'Envia todos los campos necesarios'
        });
    }

}

//Metodo para iniciar sesion
function inicioSesion(req, res) {
    var params = req.body;

    var email = params.email;
    var contrasena = params.contrasena;

    Usuario.findOne({
        email: email
    }, (err, Usuario) => {

        if (Usuario) {
            bcrypt.compare(contrasena, Usuario.contrasena, (err, check) => {
                if (check) {

                    if (params.gettoken) {
                        //Devolver un token
                        return res.status(200).send({
                            token: jwt.createToken(Usuario)
                        });
                    } else {
                        //Devolver datos de usuario
                        Usuario.contrasena = undefined;
                        return res.status(200).send({
                            Usuario
                        });
                    }
                } else {
                    return res.status(404).send({
                        message: 'Error: El usuario no se ha podido identificar'
                    });
                }
            });
        } else {
            return res.status(404).send({
                message: 'Error: El usuario no se ha podido identificar'
            });
        }
    });
}

/* ------------------------------ FIN DE LOS METODOS ------------------------------*/

module.exports = {
    pruebaUsuario,
    guardarUsuario,
    inicioSesion
}