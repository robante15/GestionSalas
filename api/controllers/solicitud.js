'use strict'

var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var moment = require('moment');

//Cargar los modelos necesarios
var Solicitud = require('../models/solicitud');
var Local = require('../models/local');
var Usuario = require('../models/usuario');

function probando(req, res) {
    res.status(200).send({
        message: 'Correcto: Enviado desde el controlador de solicitudes'
    });
}

//Funcion para guardar una nueva solicitud
function nuevaSolicitud(req, res) {
    var params = req.body;
    var solicitud = new Solicitud();

    console.log(req.body);

    if (!params.localID || !params.correlativo || !params.nombre_actividad) return res.status(500).send({
        message: 'Error: Por favor ingrese todos los parametros requeridos'
    });

    solicitud.localID = params.localID;
    solicitud.correlativo = params.correlativo;
    solicitud.fecha_solicitud = moment().unix();
    solicitud.nombre_actividad = params.nombre_actividad;
    solicitud.inicio_evento = params.inicio_evento;
    solicitud.fin_evento = params.fin_evento;
    solicitud.numero_asistentes = params.numero_asistentes;
    solicitud.rasponsable_actividad = params.rasponsable_actividad;
    solicitud.unidad_solicitante = params.unidad_solicitante;
    solicitud.jefe_unidad_solicitante = params.jefe_unidad_solicitante;
    solicitud.aprovacion = 'false';
    solicitud.administrador_sistema = req.user.sub;

    Solicitud.find({ correlativo: solicitud.correlativo }).exec((err, solicitudes) => {
        if (err) return res.status(500).send({
            message: 'Error: No se puede realizar la petición',
            Error: err
        });

        if (solicitudes && solicitudes.length >= 1) {
            return res.status(500).send({
                message: 'Error: El numero de correlativo ya esta siendo usado'
            });
        } else {
            solicitud.save((err, solicitudStored) => {
                if (err) return res.status(500).send({
                    message: 'Error: no se ha podido guardar la solicitud',
                    err: err
                });

                if (!solicitudStored) return res.status(404).send({
                    message: 'Error: La publicacion no ha sido guardada',
                });

                return res.status(200).send({
                    solicitud: solicitudStored
                });
            });
        }
    });

}

//Ver todas las solicitudes en orden del correlativo
function obtenerSolicitudes(req, res) {
    var pagina = 1;
    var items_por_pagina = 10;

    if (req.params.pagina) {
        pagina = req.params.pagina;
    }

    Solicitud.find().sort('correlativo').populate({ path: 'localID', select: 'capacidad text ubicacion nombre' })
        .populate({ path: 'administrador_sistema', select: 'nombre apellido usuario' })
        .paginate(pagina, items_por_pagina, (err, solicitudes, total) => {
            if (err) return res.status(500).send({
                message: 'Error: Error en la peticion',
                Error: err
            });

            if (!solicitudes) return res.status(404).send({
                message: 'Error: No hay solicitudes disponibles'
            });

            return res.status(200).send({
                total_items: total,
                paginas: Math.ceil(total / items_por_pagina),
                pagina: pagina,
                items_por_pagina: items_por_pagina,
                solicitudes
            })

        });
}

//Obtener disponibilidad de horarios
function obtenerDisponibilidadHoraFecha(req,res){
 
    
    Solicitud.find(
        {
            $or:[
                {
                    $and:[
                        {
                            inicio_evento:{$gt: req.params.inicio_evento}
                        },
                        {
                            inicio_evento: { $lt: req.params.fin_evento}
                        }
                    ]
                },
                {
                    $and: [
                        {
                            fin_evento: { $gt: req.params.inicio_evento }
                        },
                        {
                            fin_evento: { $lt: req.params.fin_evento }
                        }
                    ]
                }
            ]
        }, (err, solicitud) => {
            if (err) return res.status(500).send({
                message: 'Error: Error en la peticion',
                Error: err
            });

            if (!solicitud) return res.status(404).send({
                message: 'Error: No hay solicitudes disponibles'
            });

            return res.status(200).send({
                solicitud
            });

        }
    ).populate({ path: 'localID', select: 'capacidad text ubicacion nombre' })
        .populate({ path: 'administrador_sistema', select: 'nombre apellido usuario' });

}

//Obtener solicitudes segun correlativo
function obtenerSolicitudesCorrelativo(req, res) {
    Solicitud.findOne({
        correlativo: req.params.correlativo
    }, (err, solicitud) => {
        if (err) return res.status(500).send({
            message: 'Error: Error en la peticion',
            Error: err
        });

        if (!solicitud) return res.status(404).send({
            message: 'Error: No hay solicitudes disponibles'
        });

        return res.status(200).send({
            solicitud
        });

    }).populate({ path: 'localID', select: 'capacidad text ubicacion nombre' })
        .populate({ path: 'administrador_sistema', select: 'nombre apellido usuario' });
}

//Obtener solicitudes segun ID
function obtenerSolicitudesID(req, res) {
    Solicitud.findById(req.params.id, (err, solicitud) => {
        if (err) return res.status(500).send({
            message: 'Error: Error en la peticion',
            Error: err
        });

        if (!solicitud) return res.status(404).send({
            message: 'Error: No hay solicitudes disponibles'
        });

        return res.status(200).send({
            solicitud
        });

    }).populate({ path: 'localID', select: 'capacidad text ubicacion nombre' })
        .populate({ path: 'administrador_sistema', select: 'nombre apellido usuario' });
}

//Eliminar una solicitud
function eliminarSolicitud(req, res) {
    var solicitudID = req.params.id;

    Solicitud.find({
        '_id': solicitudID
    }).remove(err => {
        if (err) return res.status(500).send({
            message: 'Error: Error al borrar la solicitud',
            Error: err
        });

        return res.status(200).send({
            message: 'Solicitud eliminada de manera correcta'
        });
    });
}

function aprobarSolicitud(req, res){
    var solicitudID = req.params.id;

    Solicitud.findByIdAndUpdate(solicitudID, {aprovacion:'true'}, {new : true} ,(err, solicitudActualizada) => {
        if (err) return res.status(500).send({
            message: 'Error: Error en la peticion',
            Error: err
        });

        if (!solicitudActualizada) return res.status(404).send({
            message: 'Error: No hay solicitudes disponibles'
        });

        return res.status(200).send({
            message: 'Solicitud aprovada correctamente',
            solicitudActualizada
        });
    });
}



module.exports = {
    probando,
    nuevaSolicitud,
    obtenerSolicitudes,
    obtenerSolicitudesCorrelativo,
    obtenerDisponibilidadHoraFecha,
    obtenerSolicitudesID, 
    eliminarSolicitud,
    aprobarSolicitud
}