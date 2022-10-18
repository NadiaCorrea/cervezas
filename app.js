const express = require('express'); //llamamos a Express
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());