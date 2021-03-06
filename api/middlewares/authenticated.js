'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'EkCPSkl6cq5EWBj';

exports.ensuerAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Error: La peticion no tiene la cabecera de autorizacion',
        TESTO: req.headers
    });
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'Error: El token ha expirado'
            });
        }
    }catch(ex){
        return res.status(404).send({
            message: 'Error: El token no es valido'
        });
    }
    
    req.user = payload;
    next();
}