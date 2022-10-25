//let beers=[{name:"Cristal", type:"IPA", grading:"4.6"},{name:"Cruz Campo", type:"IPA", grading:"4.8"}];
const db = require('../models/db')



function getCervezas(req,res){
    //res.json(beers);
    res.json(db.cervezas.find());
}

/*Un recurso GET que recibe un parámetro 
y devuelve el documento con dicho id.*/

function getCerveza(req, res){

};
/*Un recurso POST para 
crear nuevos documentos de ese recurso.*/

function addCerveza(req,res){
    beers.push(req.body);
    res.json({ mensaje: '¡Cerveza añadida!' }); 
}

/*Un recurso DELETE para eliminar documentos.*/

function deleteCerveza(req,res){
    let nameToSearch = req.params.name;
    beers = arrayRemove(beers,nameToSearch);
    res.json({ mensaje: 'Cerveza eliminada.'}) 
};

function arrayRemove(array, value) {
    return array.filter(function(element){
        return element.name != value;
    });
 }

/*Un recurso PUT para editar documentos.*/

 function editCerveza(req, res){

}
module.exports = {getCervezas, getCerveza, addCerveza, deleteCerveza, editCerveza};