const express = require('express'); //llamamos a Express
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({extended:false});               
const port = 8080  // establecemos nuestro puerto

let beers=[{name:"Cristal", type:"IPA", grading:"4.6"},{name:"Cruz Campo", type:"IPA", grading:"4.8"}];

app.get('/', function(req, res) {
  res.json({ mensaje: '¡Bienvenido al mundo de las cervezas!' });   
})

app.get('/cervezas', function(req, res) {
  res.json(beers);  
})

app.post('/cervezas/', function(req, res) {
    console.log(req.body);      // your JSON
    beers.push(req.body);
    res.send(req.body);    // echo the result back
  res.json({ mensaje: '¡Cerveza añadida!' });   
})

app.del('/cervezas/:name', function(req, res) { 
  //los dos puntos indican que lo que sigue es un parametro por lo que en el tunder no hay que incluirlos
  let nameToSearch = req.params.name;
  beers = arrayRemove(beers,nameToSearch);
  console.log(beers);
  res.json({ mensaje: 'Cerveza eliminada.'})  
})

// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)

function arrayRemove(array, value) {
    return array.filter(function(element){
        return element.name != value;
    });
 }
  