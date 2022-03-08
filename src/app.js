const express = require('express');
const expressValidator = require('express-validator')
const app = express();

// Configuracion
// Defino puerto en la configuracion de la App
const port = 3001;
app.set('port', port);

// 
app.use(express.json());
//Para poder interpretar las respuestas
app.use(express.urlencoded({extended: false}));


//app.use(expressValidator());

// Ruteos
app.use('/user', require('./router/users'));
app.use('/movie', require('./router/movies'));
app.use('/favourite', require('./router/favourites'));

module.exports = app;