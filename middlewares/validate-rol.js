const {request, response} = require ('express');
const rol = require('../models/rol');

const isAdminRol = (req=request, res=response, next) => {
    if(!req.user){
       return res.status(500).json({
        msg:'No se ha validado el token primero'
       }) 
    }

    const {rol, nombre} = req.user;

    if(rol !=="ADMIN_ROLE"){
        return res.status(500).json({
            msg:`${nombre} no es administrador`
           }) 
    }
    
    next();
}


const hasRol = ( ...roles) => {
    return(req=request, res=response, next) =>{
        //aqui cod para validar roles

        if(!req.user){
            return res.status(500).json({
             msg:'No se ha validado el token primero'
            }) 
        }

        if(!roles.includes(req.user.rol)){
            return res.status(401).json({
                msg: `${req.user} no tiene un rol válido - rol no existe`
               }) 
        }

        next();
    }
}


module.exports = {isAdminRol, hasRol};