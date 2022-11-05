const express = require('express');
const app = express();



// establecemos nuestro puerto
const port = 3000;

// require('./db')
const cervezas = require('./routes/cervezas');
const bares = require('./routes/bares');

//MIDDLEWARE
app.use(express.json())

//ROUTES
app.use('/cervezas', cervezas);
app.use('/bares', bares);

// app.use(express.json());
// app.use('/cervezas', require('./routes/cervezas.js'));
// app.use('/bares', require('./routes/bares.js'));


// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port);