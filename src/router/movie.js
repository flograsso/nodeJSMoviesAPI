// movie.js
// Ruteo de la ruta /movie

const express = require('express');
const router = express.Router();

// Controller de movie
const moviesController = require('../controllers/moviesController');

// Middelware de autenticacion
const verifyToken = require ('../middleware/auth')



/*
    Ruta: /movie/list
    Lista las peliculas mas populares
    [Opcional] Parámetro "keyword" filtra por el keyword pasado como parámetro buscando en el campo del titulo.
    Metodo: GET
    Parámetros:
        - (En header con 'access-token) token de autenticación
        - [Opcional} (Como parámetro de la query) keyword 
*/
router.get('/list', 
    verifyToken,
    moviesController.getMovies
);

// Exporto el router  
module.exports = router;  