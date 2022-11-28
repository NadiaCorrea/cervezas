const {response, request} = require('express');
const bar = require('../models/bar');

//Properties of bares - id, name, address, location

//gets all bares 
async function getBares(req,res){
    //console.log('entra');
    const {nombre, direccion, localidad} = req.query;
    const query = {nombre, direccion, localidad};
    for(const key in query){
        if(query[key] === undefined){
            delete query[key];
        }
    }
    console.log(query);
    const bares = await bar.find(query);
    res.json(bares);
}

/*Un recurso GET que recibe un parámetro 
y devuelve el documento con dicho id.*/
async function getBar(req =require, res = response){
    const idToSearch = req.params.id; 
    const barToSearch = await bar.find({_id: idToSearch});
    //console.log(barToSearch);
    if(barToSearch.length){
        res.json(barToSearch[0]);
    } else{
        res.json({message: `El bar ${idToSearch} no existe`});
    }    
}

/*Un recurso POST para 
crear nuevos documentos de ese recurso.*/
async function addBar(req=request, res=response){

    const {nombre, direccion, localidad}  = req.body;
    const bares = new bar({nombre, direccion, localidad});

    //guardar en base de datos
    await bares.save();
    res.json({bares}); 
};

/*Un recurso DELETE para eliminar documentos.*/
async function deleteBar(req =request, res=response)   { 
    const barToSearch = req.params.id;
    const barToDelete = await bar.find({_id: barToSearch});
    
    if(barToDelete.length){
        await bar.deleteOne({_id: barToSearch});
        res.json(barToDelete);
    } else {
        res.json({message: `El bar ${barToSearch} no existe.`});
    }
};

/*Un recurso PUT para editar documentos.*/
async function editBar(req=request, res=response){
    const itemToUpdate = req.params.id;
    const newBar = req.body;

    await bar.updateOne({_id: itemToUpdate}, newBar);

    let updatedBar = await bar.find({_id: itemToUpdate});

    res.json(updatedBar);
};

module.exports = {getBares, getBar, addBar, deleteBar, editBar};