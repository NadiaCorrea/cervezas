let db = require('../models/db');
db = db.connect('./data', ['bares']);
const url = require('url');
const {response} = require('express');

//Properties of bares - id, name, address, location

//gets all bares if petition doesn't have query params. if petition have query params but the location
// it gets all bares which location is Sevilla and meet the other params.
function getBares(req, res){
    let query = url.parse(req.url,true).query;
    if (Object.keys(query).length == 0){
        res.json(db.bares.find());
    } else{
        if (query.localidad === undefined){
            query.localidad = "Sevilla";
        }
        //console.log(query);
        res.json(db.bares.find(query));
    }
};

/*Un recurso GET que recibe un parámetro 
y devuelve el documento con dicho id.*/
function getBar(req, res){
    let idToSearch = req.params.id; 
    let barToSearch = {_id:idToSearch};
    res.json(db.bares.findOne(barToSearch));
};

/*Un recurso POST para 
crear nuevos documentos de ese recurso.*/
function addBar(req, res){
    let newBar = req.body;
    db.bares.save(newBar);
    res.json({ mensaje: '¡Bar añadido!' }); 
};

/*Un recurso DELETE para eliminar documentos.*/
function deleteBar(req, res)   { 
    let barToSearch = req.params.id;
    let barToDelete = {_id: barToSearch};
    db.bares.remove(barToDelete);
    res.json({ mensaje: 'Bar eliminado.'}) 
};

/*Un recurso PUT para editar documentos.*/
function editBar(req, res){
    let itemToUpdate = req.params.id;
    let newBar = req.body;
    let barToSearch = {_id: itemToUpdate};
    let options = {
        multi: false,
        upsert: false
    }
    db.bares.update(barToSearch, newBar, options);
    res.json({ mensaje: 'Cerveza actualizada!'});
};

module.exports = {getBares, getBar, addBar, deleteBar, editBar};