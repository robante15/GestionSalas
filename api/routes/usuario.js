'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir: './uploads/users'})

//Metodos GET 
api.get('/prueba-usuario', UsuarioController.pruebaUsuario);
/*api.get('/pruebas', md_auth.ensuerAuth, UserController.pruebas);
api.get('/user/:id', md_auth.ensuerAuth ,UserController.getUser);
api.get('/users/:page?', md_auth.ensuerAuth ,UserController.getUsers);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
api.get('/counters/:id?', md_auth.ensuerAuth ,UserController.getCounters); */

//Metodos POST
api.post('/registrar', UsuarioController.guardarUsuario);
api.post('/inicioSesion', UsuarioController.inicioSesion);
/*api.post('/search-user/:page?', md_auth.ensuerAuth, UserController.searchUsers);
api.post('/upload-image-user/:id', [md_auth.ensuerAuth, md_upload], UserController.uploadImage); */

//Metodo PUT
/* api.put('/update-user/:id', md_auth.ensuerAuth, UserController.updateUser); */

module.exports = api;