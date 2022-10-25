const db = require('../models/db')

//let bares = [{id:1, name:"Gambrinus", location:"Sevilla"}, {id:2, name:"La esquina", location:"Brenes"}];
// const lastBar = bares.slice(-1);
// const id = lastBar.id;

function getBares(req, res){
    //res.json(bares);
    res.json(db.bares.find());
};

function getBar(req, res){

};

function addBar(req, res){
    bares.push(req.body);
    res.json({ mensaje: '¡Bar añadido!' }); 
};

function deleteBar(req, res)   { 
let barToSearch = req.params.name;
bares = arrayRemove(bares,barToSearch);
res.json({ mensaje: 'Bar eliminado.'}) 
};

function arrayRemove(array, value) {
return array.filter(function(element){
    return element.name != value;
});
};


function editBar(req, res){

};

module.exports = {getBares, getBar, addBar, deleteBar, editBar};