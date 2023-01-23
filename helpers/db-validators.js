//modelos importados
const Rol = require('../models/rol')
const User = require('../models/user')
const Cerveza = require ('../models/cerveza')

//funciones de validación de rol de usuario
const isValidRol = async (rol = '')=> {
	const existeRol = await Rol.findOne({ rol })
		  if (!existeRol) {
			  throw new Error(`Rol ${rol} not exists in database`)
		  }
}

//función de validación de email de usuario
const existEmail = async(email) =>{
	const emailDB = await User.findOne({email});
	if (emailDB){
		throw new Error(`Email ${email} already exists in database`)
	}
}

//función si existe useuario
const existUser = async (id) => {
    const idDb = await User.findById(id);
    if(!idDb){
        throw new Error(`User with id ${id} doesn't exist`);
    }
}

// hacer validaciones de cerveza {Nombre, Descripción, Graduación, Envase, Precio}

//valitidating if name doesn't exist
const existCervezaName = async(name) =>{
	const nameDB = await Cerveza.findOne({name});

	if(nameDB){
		throw new Error(`Cerveza name ${name} already exists in database`)
	}
}








module.exports = { isValidRol, existEmail, existUser, existCervezaName}