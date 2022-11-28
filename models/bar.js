const { Schema, model } = require('mongoose');

const BarSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
        
    },
    localidad: {
        type: String,
        required: [true, 'La localidad es obligatoria'],
    },
});



module.exports = model( 'Bar', BarSchema );