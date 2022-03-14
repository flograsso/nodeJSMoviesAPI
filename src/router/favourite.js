// favourite.js
// Ruteo de la ruta /favourites

const express = require('express');
const router = express.Router();
const verifyToken = require ('../middleware/auth')

const favouritesController = require('../controllers/favouritesController');
/*
    Ruta: /favourite/add
    Agrega una nueva pelicula a la lista de peliculas favoritas del usuario
    Metodo: POST
    Parametros en body en formato JSON
        - id (identificador unico)
        - title
        - overview
    Auth (on Header)  
        - Method: API KEY
        - Key: access-token
    Return:
        - resultado de la creacion de la pelicula
*/
router.post('/add', 
            validate(('createFavouriteMovie')),
            verifyToken,
            favouritesController.addMovie
);


/*
    Ruta: /favourite/list
    Lista las peliculas favoritas del usuario registrado
    Metodo: GET
    Auth (on Header)  
        - Method: API KEY
        - Key: access-token
    Return:
        - Listado de peliculas favoritas de usuario (JSON)
*/
router.get('/list', 
            verifyToken,
            favouritesController.getMovies
);



// TODO: Utilizar un servicio que permita documentar una API correctamente,


// Exporto el router  
module.exports = router;  