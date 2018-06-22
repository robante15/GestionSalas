'use strict'

var express = require('express');
var api = express.Router();
var multipart = require('connect-multiparty');

var UbicacionController = require('../controllers/ubicacion');
var md_auth = require('../middlewares/authenticated');
//var md_upload = multipart({uploadDir: './uploads/comments'});

//Metodos GET
api.get('/probando-ubicaciones', md_auth.ensuerAuth, UbicacionController.probando);
api.get('/todasUbicaciones/:pagina?', md_auth.ensuerAuth, UbicacionController.obtenerUbicaciones);
api.get('/ubicacion/:id', md_auth.ensuerAuth, UbicacionController.obtenerUbicacion);
/*api.get('/commentary-user/:user_id/:page?', md_auth.ensuerAuth, CommentaryController.getCommentaryUser);
api.get('/commentary/:id', md_auth.ensuerAuth, CommentaryController.getCommentary);
api.get('/get-image-comment/:imageFile', CommentaryController.getImageFile); */


//Metodos POST
api.post('/nuevaUbicacion', md_auth.ensuerAuth , UbicacionController.nuevaUbicacion);
/*api.post('/commentary/:id', md_auth.ensuerAuth, CommentaryController.getCommentary);
api.post('/upload-image-comment/:id',[md_auth.ensuerAuth, md_upload], CommentaryController.uploadImage);
api.post('/comments/:page?', md_auth.ensuerAuth, CommentaryController.getComments); */

//Metodos DELETE
api.delete('/borrar-ubicacion/:id', md_auth.ensuerAuth, UbicacionController.eliminarUbicacion);

module.exports = api;