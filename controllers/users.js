const { response, request } = require("express")
const users = require ('../models/user');
const bcryptjs = require('bcryptjs');

async function getUsers(req=request, res= response){
    // declaramos los parámetros que vamos a quere usar así si nos pasan otros parámetros no los cogerá
    const {nombre, apellidos, nick, email, contrasena, rol, limit=5, skip=0 } = req.query;
    const query = {nombre, apellidos, nick, email, contrasena, rol, limit, skip}

    for(const key in query){
        if(query[key] === undefined){
            delete query[key];
        }
    }
    query.state = false;

    const result = await users.find(query).limit(limit).skip(skip);
    res.json(result);
}

async function getUser(req=request, res=response){
    const idToSearch = req.params.id;
    const result  = await users.find({_id: idToSearch});

    if (result.length){
        res.json(result[0]);
    } else{
        res.json({ message: `El usuario ${idToSearch} no existe` });
    }
}

async function addUser(req=request, res=response){
    // {} declaramos los parámetros que vamos a quere usar así si nos pasan otros parámetros no los cogerá
    const {nombre, apellidos, nick, email, contrasena, rol} =req.body;
    // validación de datos
    const existsEmail = await users.find({email: email}); // si se llaman igual {email}
    // si se usa findOne() la condicion sería solo existsEmail
    if(existsEmail.length){
        return res.status(400).json({message:'El email ya existe'})
    }

    const user = new users({nombre, apellidos, nick, email, contrasena, rol});
    // para encriptar la contraseña importar bcryptjs 
    const salt = bcryptjs.genSaltSync();
    user.contrasena = bcryptjs.hashSync(contrasena,salt);

  // await rompe la sincronía y hasta que esto no acabe no continua - solo se puede usar dentro de una función asíncrona
    await user.save();
    res.json({user});
}

async function deleteUser(req=request, res=response){
    const idToSearch = req.params.id;
    const userToDelete = await users.findByIdAndUpdate(idToSearch, {"state": false});

    res.json({userToDelete});
    //const userToDelete = await users.find({_id: idToSearch});
    // if(userToDelete.length){
    //     await users.deleteOne({_id: idToSearch});
    //     res.json(userToDelete);
    // } else{
    //     res.json({ message: `El usuario ${idToSearch} no existe` });
    // }
}

async function editUser(req=request, res=response){
    const idToUpdate = req.params.id;
    //de esta manera no podrán modificar ni el id ni el email ni el estado
    const {_id, email, state, ...userBody} = req.body;

    //hay que encriptar la contraseña si la envían 
    const salt = bcryptjs.genSaltSync();
    userBody.contrasena = bcryptjs.hashSync(userBody.contrasena,salt);

    const updatedUser = await users.findByIdAndUpdate({_id:idToUpdate}, userBody);

    // await users.updateOne({_id:idToUpdate}, newUser);

    // let updatedUser = await users.find({_id:idToUpdate});

    res.json(updatedUser);

}

module.exports = {getUsers, getUser, addUser, deleteUser, editUser};