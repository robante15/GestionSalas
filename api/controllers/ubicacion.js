'use strict'

var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var moment = require('moment');

//Carga de los modelos requeridos
var Ubicaciones = require('../models/ubicaciones');

//Funcion de prueba para el controlador
function probando(req, res) {
    res.status(200).send({
        message: 'Correcto: Enviado desde el controlador de comentarios'
    });
}

module.exports = {
    probando
}