'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SolicitudSchema = Schema({
    localID: {
        type: Schema.ObjectId,
        ref: 'Local'
    },
    correlativo: Number,
    fecha_solicitud: String,
    nombre_actividad: String,
    fecha_evento: String,
    hora_inicio_evento: String,
    hora_fin_evento: String,
    numero_asistentes: Number,
    responsable_actividad: String,
    unidad_solicitante: String,
    jefe_unidad_solicitante: String,
    aprovacion: Boolean,
    administrador_sistema: {
        type: Schema.ObjectId,
        ref: 'Usuario'
    }
    
});

module.exports = mongoose.model('Solicitud', SolicitudSchema);