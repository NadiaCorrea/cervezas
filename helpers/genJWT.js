const jwt = require('jsonwebtoken');

const genJWT = (uid = '') => { // uid el id del usuario
	return new Promise( (resolve, reject) =>{
		const payload = { uid};// aqui se añade la información que queramos y que nos hagan falta 
		jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {// cada vez q se llama a process se llama a variable de entorno
			expiresIn: '4h'
		}, (err, token) => {
			if(err) {
				console.log(err);
				reject('No se pudo generar el jwt')
			} else {
				resolve( token)
			}
		} )
		
	})
}

module.exports={genJWT}



