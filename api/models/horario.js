'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HorarioSchema = Schema({
    localID: {
        type: Schema.ObjectId,
        ref: 'Local'
    },
    solicitudID: {
        type: Schema.ObjectId,
        ref: 'Solicitud'
    },
    fecha: String,
    hora_inicio: String,
    hora_final: String
});

module.exports = mongoose.model('Horario', HorarioSchema);