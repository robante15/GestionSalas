'use strict'

var express = require('express');
var api = express.Router();

var LocalController = require('../controllers/local');
var md_auth = require('../middlewares/authenticated');

//Metodos GET
api.get('/probando-locales', md_auth.ensuerAuth, LocalController.probando);
api.get('/obtener-local/:id', md_auth.ensuerAuth, LocalController.obtenerLocal);
api.get('/obtener-todos-locales/:pagina?', md_auth.ensuerAuth, LocalController.obtenerLocalesTodos);
api.get('/obtener-todos-locales-sinpag/', md_auth.ensuerAuth, LocalController.obtenerLocalesTodosSinPag);


//Metodos POST
api.post('/nuevo-local', md_auth.ensuerAuth, LocalController.guardarLocal);
api.post('/locales-ubicacion/:pagina?', md_auth.ensuerAuth, LocalController.obtenerLocalesUbicacion);

//Metodo DELETE
api.delete('/eliminar-local/:id', md_auth.ensuerAuth, LocalController.eliminarLocal);
module.exports = api;