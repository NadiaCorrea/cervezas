const { Schema, model } = require('mongoose');

// nombre, apellidos, nick, email y contraseña. Además tendrás que poner algunas restricciones en los modelos
const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios'],
        
    },
    nick: {
        type: String,
        required: [true, 'El nick es obligatorio'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    rol:{
        type:String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state:{
        type: Boolean,
        default: true
    }
});

module.exports = model( 'User', UserSchema );