'use strict'
var moment = require('moment');

//Carga de los modelos requeridos
var Ubicacion = require('../models/ubicacion');
var Local = require('../models/local');

//Funcion de prueba para el controlador
function probando(req, res) {
    res.status(200).send({
        message: 'Correcto: Enviado desde el controlador de locales'
    });
}

function guardarLocal(req, res) {
    var params = req.body;
    var local = new Local();

    if (!params.ubicacion || !params.nombre || !params.capacidad) return res.status(404).send({
        message: 'Error: Debes de enviar un nombre, la capacidad y una ubicacion'
    });

    local.nombre = params.nombre;
    local.ubicacion = params.ubicacion;
    local.text = params.text;
    local.capacidad = params.capacidad;
    local.file = null;
    local.created_at = moment().unix();

    local.save((err, localStored) => {
        if (err) return res.status(500).send({
            message: 'Error: no se ha podido guardar el local'
        })

        if (!localStored) return res.status(404).send({
            message: 'Error: El local no ha sido guardado'
        });

        return res.status(200).send({
            Local: localStored
        });
    });
}

function obtenerLocal(req, res) {
    var localID = req.params.id;

    Local.findById(localID, (err, local) => {
        if (err) return res.status(500).send({
            message: 'Error: Error al devolver el local'
        });
        if (!local) return res.status(404).send({
            message: 'Error: No hay local'
        });
        return res.status(200).send({
            local
        });
    }).populate('ubicacion');
}

function obtenerLocalesUbicacion(req, res) {
    var pagina = 1;
    var ubicacion_id;
    var items_por_pagina = 5;

    if (req.params.pagina) {
        pagina = req.params.pagina;
    }

    if (req.body.ubicacion_id) {
        ubicacion_id = req.body.ubicacion_id;
    } else {
        return res.status(404).send({ message: 'Error: No hay un ID de ubicación' })
    }

    Local.find({
        ubicacion: ubicacion_id
    }).sort('nombre').populate('ubicacion').paginate(pagina, items_por_pagina, (err, locales, total) => {
        if (err) return res.status(500).send({
            message: 'Error: Error al devolver los locales de esta ubicación'
        });

        if (!locales) return res.status(404).send({
            message: 'Error: No hay locales en esta ubicación'
        });

        return res.status(200).send({
            total_items: total,
            paginas: Math.ceil(total / items_por_pagina),
            pagina: pagina,
            items_por_pagina: items_por_pagina,
            locales
        })
    });
}

function obtenerLocalesTodos(req, res) {
    var pagina = 1;
    var items_por_pagina = 5;

    if (req.params.pagina) {
        pagina = req.params.pagina;
    }


    Local.find({}).sort('nombre').populate('ubicacion').paginate(pagina, items_por_pagina, (err, locales, total) => {
        if (err) return res.status(500).send({
            message: 'Error: Error al devolver los locales'
        });

        if (!locales) return res.status(404).send({
            message: 'Error: No hay locales'
        });

        return res.status(200).send({
            total_items: total,
            paginas: Math.ceil(total / items_por_pagina),
            pagina: pagina,
            items_por_pagina: items_por_pagina,
            locales
        })
    });
}

function obtenerLocalesTodosSinPag(req, res) {


    if (req.params.pagina) {
        pagina = req.params.pagina;
    }


    Local.find({}, (err, locales) => {
        if (err) return res.status(500).send({
            message: 'Error: Error en la peticion',
            Error: err
        });

        if (!locales) return res.status(404).send({
            message: 'Error: No hay solicitudes disponibles'
        });

        return res.status(200).send({
            locales
        });
    }
    ).sort('nombre').populate('ubicacion');
}

//Elimina un local
function eliminarLocal(req, res) {
    var localID = req.params.id;

    if(!req.params.id) return res.status(404).send({message: 'Error: Debe de ingresar una ID de local'});

    Local.find({
        '_id': localID
    }).remove(err => {
        if (err) return res.status(500).send({
            message:'Error: Error al borrar el local',
            error: err
        });

        return res.status(200).send({
            message: 'Local eliminado de manera correcta'
        });
    });
}

module.exports = {
    probando,
    guardarLocal,
    obtenerLocal, 
    obtenerLocalesUbicacion,
    obtenerLocalesTodosSinPag,
    obtenerLocalesTodos,
    eliminarLocal
}