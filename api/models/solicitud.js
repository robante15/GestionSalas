'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SolicitudSchema = Schema({
    localID: {
        type: Schema.ObjectId,
        ref: 'Local'
    },
    correlativo: Number,
    fecha_solicitud: Number,
    nombre_actividad: String,
    inicio_evento: Number,
    fin_evento: Number,
    numero_asistentes: Number,
    responsable_actividad: String,
    unidad_solicitante: String,
    jefe_unidad_solicitante: String,
    aprovacion: String,
    administrador_sistema: {
        type: Schema.ObjectId,
        ref: 'Usuario'
    }
    
});

module.exports = mongoose.model('Solicitud', SolicitudSchema);