'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    usuario: String,
    contrasena: String,
    email: String,
    nombre: String,
    apellido: String,
    rol: String,
    departamento_seccion: String,
    image: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);