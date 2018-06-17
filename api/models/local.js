'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocalSchema = Schema({
    nombre: String,
    ubicacion: {
        type: Schema.ObjectId,
        ref: 'Ubicacion'
    },
    text: String,
    file: String,
    created_at: String
});

module.exports = mongoose.model('Local', LocalSchema);