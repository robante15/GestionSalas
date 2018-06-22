'use strict'

//Importar el uso de Mongoose 
var mongoose = require('mongoose');
var app = require('./app');
var ip = 'localhost'
var port = '3800';
var bdPort = '31070';
var bdIP = 'ds231070.mlab.com';
var user = 'Desarrollador';
var passwd = 'ues12345678';
var bd = 'gestion_salas';

//Conexion a la Base de Datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+user+':'+passwd+'@'+bdIP+':'+bdPort+'/'+bd+'',  { useMongoClient: true })
    .then(() => {
        console.log("Correcto: La conexion a la base de datos RedSocial se ha realizado correctamente");

        //Crear el servidor
        app.listen(port, () => {
            console.log("Correcto: El servidor de la API se ha creado correctamente, corriendo en http://" + ip + ":" + port);
        })
    })
    .catch(err => console.log(err));