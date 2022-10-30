//let beers=[{name:"Cristal", type:"IPA", grading:"4.6"},{name:"Cruz Campo", type:"IPA", grading:"4.8"}];
let db = require('../models/db');
db = db.connect('./data', ['cervezas']);
const url = require('url');
const { response } = require('express');

function getCervezas(req,res){
    //obtengo los query params que se envían en la url 
    let query = url.parse(req.url, true).query;
    // count the number of keys/properties of an object
    if (Object.keys(query).length == 0){
        res.json(db.cervezas.find());
    } else{
        if (query.Precio === undefined){
            query.Precio = "1€";
        }
        //console.log(query);
        res.json(db.cervezas.find(query));
    }
}

/*Un recurso GET que recibe un parámetro 
y devuelve el documento con dicho id.*/
function getCerveza(req, res){
    let idToSearch = req.params.id;
    let itemToSearch = {_id: idToSearch}
    res.json(db.cervezas.findOne(itemToSearch));

};
/*Un recurso POST para 
crear nuevos documentos de ese recurso.*/

function addCerveza(req,res){
    let newBeer = req.body;
    db.cervezas.save(newBeer);
    res.json({ mensaje: '¡Cerveza añadida!' }); 
}

/*Un recurso DELETE para eliminar documentos.*/

function deleteCerveza(req,res){
    let itemToSearch = req.params.id;
    let beerToDelete = {_id: itemToSearch}
    db.cervezas.remove(beerToDelete);
    res.json({ mensaje: 'Cerveza eliminada.'}) 
};


/*Un recurso PUT para editar documentos.*/

 function editCerveza(req, res){
    let itemToUpdate = req.params.id;
    let newBeer = req.body;
    let itemToSearch = {_id: itemToUpdate};
    let options = {
        multi: false,
        upsert: false
    }
    db.cervezas.update(itemToSearch, newBeer, options);

    res.json({ mensaje: 'Cerveza actualizada!'} );
}
module.exports = {getCervezas, getCerveza, addCerveza, deleteCerveza, editCerveza};