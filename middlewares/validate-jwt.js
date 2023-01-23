const { request, response} = require('express');
const jwt = require('jsonwebtoken');
const users = require ('../models/user');

async function validateJWT (req=request, res=response, next){ 
    const token = req.header('x-token'); //siempre q haga una petición hay q ponerle la cabecera 
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await users.findById(uid); // recuperar el usuario buscarlo y guardarlo en el req

        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe'
            })
        }

        if(!user.state){
            return res.status(401).json({
                msg: 'Token no válido - usuario deshabilitado'
            })
        }

        req.user = user;

        next();
        // el objeto request se pasa a un middleware se pasa a los siguientes por ello puedo agrgarle mas cosas

    } catch (error) {
        console.log(error);
    }


}

module.exports= {validateJWT}