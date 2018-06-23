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
    fecha: Number,
    hora_inicio: Number,
    hora_final: Number
});

module.exports = mongoose.model('Horario', HorarioSchema);