const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const fileUpload =require('express-fileupload');

const app = express()
// require('./db')
const cervezas = require('./routes/cervezas')
const bares = require('./routes/bares')
const users = require('./routes/users')
const login = require('./routes/login')
const upload = require('./routes/fichero')

// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}

connectAtlas()
//MIDDLEWARE que indica que la información se va enviar a través de un json 
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath:true
}));

//ROUTES
app.use('/cervezas', cervezas)
app.use('/bares', bares)
app.use('/users', users)
app.use('/auth/login', login)
app.use('/upload', upload)

app.listen(process.env.PORT)

//https://bluuweb.github.io/desarrollo-web-bluuweb/20-01-node/#req-query
//https://www.youtube.com/watch?v=xkHyM-K3Cd8 