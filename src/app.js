// app.js

// Requires
const express = require('express');
const expressValidator = require('express-validator')


// Configuracion

// Defino puerto 
process.env.PORT = 3001;

// Key para generar token de autenticacion
process.env.AUTH_TOKEN_KEY = '2jje7dhd2es93jf'

// Path del archivo de usuarios
process.env.USERS_FILE_PATH = 'src/data/users.txt'

// API key de IMDB
process.env.IMDB_APIKEY = '2af772df821443ec882252df3de8957b';

// TODO: Esto podría definirse en un archivo externo .env con el modulo "dot-env"

const app = express();

// Para interpretar JSON
app.use(express.json()); 

//Para interpretar las respuestas
app.use(express.urlencoded({extended: false}));


// Ruteos
app.use('/user', require('./router/user'));
app.use('/movie', require('./router/movie'));
app.use('/favourite', require('./router/favourite'));


module.exports = app;