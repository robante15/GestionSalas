'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UbicacionSchema = Schema({
    nombre: String,
    cantidad_locales: Number,
});

module.exports = mongoose.model('Ubicacion', UbicacionSchema);