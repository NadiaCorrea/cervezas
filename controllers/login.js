const { response, request } = require("express");
const users = require ('../models/user');
const bcryptjs = require('bcryptjs');

async function addLogin(req=request, res=response){
    //obtengo los parámetros enviados y que necesito
    const {email, password} = req.body;

    const existsEmail = await users.findOne({email: email}); 

    if(!existsEmail){
        //error el email no existe
        res.status(400).json({message:'El email no existe'});
    }

    //si email existe se verifica que la contraseña sea la que existe en la base de datos y que el estado del usuario esté activo
    if (bcryptjs.compareSync(password, existsEmail.contrasenna) && existsEmail.state == true){
        res.status(200).json({message:'Usuario authorizado'});
    }    
    //console.log(existEmail);

}

module.exports = {addLogin}