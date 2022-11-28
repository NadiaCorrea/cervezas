const {response, request} = require('express');
const beers = require('../models/cerveza');

async function getCervezas(req,res){
    const {Nombre, Descripción, Graduación, Envase, Precio} = req.query;
    const query = {Nombre, Descripción, Graduación, Envase, Precio};
    for(const key in query){
        if(query[key] === undefined){
            delete query[key];
        }
    }
    const cervezas = await beers.find(query);
    res.json(cervezas);
}

/*Un recurso GET que recibe un parámetro 
y devuelve el documento con dicho id.*/
async function getCerveza(req = request, res = response){
    const idToSearch = req.params.id;
    const cerveza = await beers.find({_id: idToSearch});

    if(cerveza.length){
        res.json(cerveza[0]);
    } else{
        res.json({ message: `La cerveza ${idToSearch} no existe` });
    }
}

/*Un recurso POST para 
crear nuevos documentos de ese recurso.*/
async function addCerveza(req =request,res = response){
    const {Nombre, Descripción, Graduación, Envase, Precio} = req.body;
    const cerveza = new beers({Nombre, Descripción, Graduación, Envase, Precio});

    //guardar en base de datos
    await cerveza.save();
    res.json({cerveza}); 
}

/*Un recurso DELETE para eliminar documentos.*/

async function deleteCerveza(req = request, res =response){
    const itemToSearch = req.params.id;
    const beerToDelete = await beers.find({_id: itemToSearch});

    if(beerToDelete.length){
        await beers.deleteOne({_id: itemToSearch});
        res.json(beerToDelete);
    } else{
        res.json({message: `La cerveza ${idToSearch} no existe.`});
    }
}

/*Un recurso PUT para editar documentos.*/
async function editCerveza(req = request, res = response){
    const itemToUpdate = req.params.id;
    const newBeer = req.body;

    await beers.updateOne({_id: itemToUpdate}, newBeer);

    let updatedbeer = await beers.find({_id: itemToUpdate});
    
    res.json(updatedbeer);

}

module.exports = {getCervezas, getCerveza, addCerveza, deleteCerveza, editCerveza};
