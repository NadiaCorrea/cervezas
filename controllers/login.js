const { response, request } = require("express");
const users = require ('../models/user');
const bcryptjs = require('bcryptjs');
const { genJWT } = require("../helpers/genJWT");

// async function addLogin(req=request, res=response){
//     //obtengo los parámetros enviados y que necesito
//     const {email, password} = req.body;

//     const existsEmail = await users.findOne({email: email}); 

//     if(!existsEmail){
//         //error el email no existe
//         res.status(400).json({message:'El email no existe'});
//     }

//     //si email existe se verifica que la contraseña sea la que existe en la base de datos y que el estado del usuario esté activo
//     if (bcryptjs.compareSync(password, existsEmail.contrasenna) && existsEmail.state == true){
//         res.status(200).json({message:'Usuario authorizado'});
//     }    
//     //console.log(existEmail);

// }


const addLogin = async (req=request, res=response) =>{
    const {email, password} = req.body;
    try {
        //verificamos que el usuario existe
        const user = await users.findOne({email});

        if (!user){
            return res.status(401).json({
                msg: "User/ password incorrecto - email" //no debemos poner los de email ya que por seguridad no debemos dar pistas 
            })
        }

        //verificar que el usuario está activo
        if(!user.state){
            return res.status(401).json({
                msg: "User/ password incorrecto - inactive"
            })
        }
        // verificar que la contraseña 
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(401).json({
                msg: "User/ password incorrecto - password"
            })
        }

        //generamos el jwt hay que llamarlo con await ya q es una promesa 
        const token = await genJWT (user._id);

        //devolvemos el usuario y el token 
        res.json({
            user, token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }
}

module.exports = {addLogin}