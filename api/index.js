'use strict'

//Importar el uso de Mongoose 
var mongoose = require('mongoose');
var app = require('./app');
var ip = 'localhost'
var port = '3800';
var bdPort = '27017';
var bdIP = 'localhost';
/*var user = 'SuperUserChingon';
var passwd = 'puQ8ENR6lY';
var bd = 'RedSocial';*/

//Conexion a la Base de Datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + bdIP + ':' + bdPort + '/GestionSalas', { useMongoClient: true })
    //mongoose.connect('mongodb://'+user+':'+passwd+'@'+bdIP+':'+bdPort+'/'+bd+'',  { useMongoClient: true })
    .then(() => {
        console.log("Correcto: La conexion a la base de datos RedSocial se ha realizado correctamente");

        //Crear el servidor
        app.listen(port, () => {
            console.log("Correcto: El servidor de la API se ha creado correctamente, corriendo en http://" + ip + ":" + port);
        })
    })
    .catch(err => console.log(err));