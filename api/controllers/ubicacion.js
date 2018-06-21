'use strict'

/*var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var moment = require('moment');*/

//Carga de los modelos requeridos
var Ubicacion = require('../models/ubicacion');

//Funcion de prueba para el controlador
function probando(req, res) {
    res.status(200).send({
        message: 'Correcto: Enviado desde el controlador de comentarios'
    });
}

//Funcion para guardar una nueva ubicación
function nuevaUbicacion(req, res) {
    var params = req.body;
    var ubicacion = new Ubicacion();

    if (!params.nombre || !params.cantidadLocales) return res.status(404).send({
        message: 'Error: Necesitas ingresar el nombre, y la cantidad de locales para registrar una ubicación'
    });

    ubicacion.nombre = params.nombre;
    ubicacion.cantidad_locales = params.cantidadLocales;

    ubicacion.save((err, ubicacionStored) => {
        if (err) return res.status(404).send({
            message: 'Error: No se ha podido guardar la ubicación'
        });

        if (!ubicacionStored) return res.status(404).send({
            message: 'Error: No se ha podido guardar la ubicación'
        });

        return res.status(200).send({
            ubicacion: ubicacionStored
        });

    });

}

//Funcion para ver todas las ubicaciones
function obtenerUbicaciones(req, res) {
    var pagina = 1;
    if (req.params.pagina) {
        pagina = req.params.pagina
    }

    var itemsPorPagina = 10;

    Ubicacion.find({
    }).sort('-nombre').paginate(pagina, itemsPorPagina, (err, ubicaciones, total) => {
        if (err) return res.status(500).send({
            message: 'Error: Error al devolver ubicaciones'
        });

        if (!ubicaciones) return res.status(404).send({
            message: 'Error: No hay ubicaciones'
        });

        return res.status(200).send({
            total_items: total,
            paginas: Math.ceil(total / itemsPorPagina),
            pagina: pagina,
            itemsPorPagina: itemsPorPagina,
            ubicaciones
        });

    });

}

//Funcion para ver una ubicacion en especifico
function obtenerUbicacion(req, res) {
    var ubicacionID = req.params.id;

    Ubicacion.findById(ubicacionID, (err, ubicacion) => {
        if (err) return res.status(500).send({
            message: 'Error: Error al devolver la ubicacion'
        });
        if (!ubicacion) return res.status(404).send({
            message: 'Error: No hay publicacion'
        });

        return res.status(200).send({
            ubicacion
        });
    });
}

//Funcion para eliminar una publicación en especifico
function eliminarUbicacion(req, res) {
    var ubicacionID = req.params.id;

    Ubicacion.find({
        '_id': ubicacionID
    }).remove(err => {
        if (err) return res.status(500).send({
            message: 'Error: Error al borrar la ubicacion'
        });

        return res.status(200).send({
            message: 'Ubicación eliminada de manera correcta'
        });
    });
}

module.exports = {
    probando,
    nuevaUbicacion,
    obtenerUbicaciones,
    obtenerUbicacion,
    eliminarUbicacion
}