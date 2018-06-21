'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UbicacionSchema = Schema({
    nombre: String,
    cantidad_locales: String,
});

module.exports = mongoose.model('Ubicacion', UbicacionSchema);