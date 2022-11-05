const db = require('../models/db');
const {response, request} = require('express');
const Cerveza = require('../models/cerveza');
// db = db.connect('./data', ['cervezas']);
// const url = require('url');

async function getCervezas(req,res){
    const {Nombre, Descripción, Graduación, Envase, Precio} = req.query;
    const query = {Nombre, Descripción, Graduación, Envase, Precio};
    for(const key in query){
        if(query[key] === undefined){
            delete query[key];
        }
    }
    const cervezas = await Cerveza.find(query);
    res.json(cervezas);
}

// function getCervezas(req,res){
//     //obtengo los query params que se envían en la url 
//     let query = url.parse(req.url, true).query;
//     // count the number of keys/properties of an object
//     if (Object.keys(query).length == 0){
//         res.json(db.cervezas.find());
//     } else{
//         if (query.Precio === undefined){
//             query.Precio = "1€";
//         }
//         //console.log(query);
//         res.json(db.cervezas.find(query));
//     }
// }

/*Un recurso GET que recibe un parámetro 
y devuelve el documento con dicho id.*/
function getCerveza(req = request, res = response){
    const idToSearch = req.params.id;
    const cerveza = db.cervezas.find({_id: idToSearch});

    if(cerveza.length){
        res.json(cerveza);
    } else{
        res.json({ message: `La cerveza ${id} no existe` });
    }
};

/*Un recurso POST para 
crear nuevos documentos de ese recurso.*/
async function addCerveza(req =request,res = response){
    const {Nombre, Descripción, Graduación, Envase, Precio} = req.body;
    const cerveza = new Cerveza({Nombre, Descripción, Graduación, Envase, Precio});

    //guardar en base de datos
    await cerveza.save();
    res.json({cerveza}); 
}

/*Un recurso DELETE para eliminar documentos.*/

function deleteCerveza(req = request, res =response){
    const itemToSearch = req.params.id;
    const beerToDelete = db.cervezas.remove({_id: itemToSearch});
    res.json(beerToDelete);
};


/*Un recurso PUT para editar documentos.*/
function editCerveza(req = request, res = response){
    const itemToUpdate = req.params.id;
    const newBeer = req.body;
    const updatedBeer = db.cervezas.update({_id: itemToUpdate}, newBeer);

    res.json(updatedBeer);

}

//  function editCerveza(req = request, res = response){
//     let itemToUpdate = req.params.id;
//     let newBeer = req.body;
//     let itemToSearch = {_id: itemToUpdate};
//     let options = {
//         multi: false,
//         upsert: false
//     }
//     db.cervezas.update(itemToSearch, newBeer, options);

//     res.json({ mensaje: 'Cerveza actualizada!'} );
// }
module.exports = {getCervezas, getCerveza, addCerveza, deleteCerveza, editCerveza};