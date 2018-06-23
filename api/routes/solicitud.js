'use strict'

var express = require('express');
var api = express.Router();
var multipart = require('connect-multiparty');

var SolicitudController = require('../controllers/solicitud');
var md_auth = require('../middlewares/authenticated');

//Metodos GET
api.get('/probando-solicitudes', md_auth.ensuerAuth, SolicitudController.probando);
api.get('/obtener-solicitudes/:pagina?', md_auth.ensuerAuth, SolicitudController.obtenerSolicitudes);
api.get('/obtener-solicitudes-aprovadas/:pagina?', md_auth.ensuerAuth, SolicitudController.obtenerSolicitudesAprovadas);
api.get('/obtener-solicitudes-denegadas/:pagina?', md_auth.ensuerAuth, SolicitudController.obtenerSolicitudesDenegadas);
api.get('/obtener-solicitudes-pendientes/:pagina?', md_auth.ensuerAuth, SolicitudController.obtenerSolicitudesPendientes);
api.get('/obtener-solicitud-correlativo/:correlativo', md_auth.ensuerAuth, SolicitudController.obtenerSolicitudesCorrelativo);
api.get('/obtener-solicitud-id/:id', md_auth.ensuerAuth, SolicitudController.obtenerSolicitudesID);
api.get('/obtener-solicitudes-ocupado/:pagina?', md_auth.ensuerAuth, SolicitudController.obtenerDisponibilidadHoraFecha);

//Metodos POST
api.post('/nueva-solicitud', md_auth.ensuerAuth, SolicitudController.nuevaSolicitud);

//Metodos DELETE
api.delete('/solicitud-delete/:id', md_auth.ensuerAuth, SolicitudController.eliminarSolicitud);

//Metodo PUT
api.put('/aprobar-solicitud/:id', md_auth.ensuerAuth, SolicitudController.aprobarSolicitud);

module.exports = api;
