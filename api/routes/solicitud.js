'use strict'

var express = require('express');
var api = express.Router();
var multipart = require('connect-multiparty');

var SolicitudController = require('../controllers/solicitud');
var md_auth = require('../middlewares/authenticated');

//Metodos GET
api.get('/probando-solicitudes', md_auth.ensuerAuth, SolicitudController.probando);
api.get('/obtener-solicitudes/:pagina?', md_auth.ensuerAuth, SolicitudController.obtenerSolicitudes);
api.get('/obtener-solicitud-correlativo/:correlativo', md_auth.ensuerAuth, SolicitudController.obtenerSolicitudesCorrelativo);
api.get('/obtener-solicitud-id/:id', md_auth.ensuerAuth, SolicitudController.obtenerSolicitudesID);

//Metodos POST
api.post('/nueva-solicitud', md_auth.ensuerAuth, SolicitudController.nuevaSolicitud);

//Metodos DELETE
api.delete('/solicitud-delete/:id', md_auth.ensuerAuth, SolicitudController.eliminarSolicitud);

//Metodo PUT
api.put('/aprobar-solicitud/:id', md_auth.ensuerAuth, SolicitudController.aprobarSolicitud);

module.exports = api;
