// user.js
// Ruteo de la ruta /user

const express = require('express');
const router = express.Router();

// Middelware validador de request
const validate = require ('../middleware/validate')

// Controller de user
const usersController = require('../controllers/usersController');


/*
    Ruta: /user/add
    Crea un nuevo usuario.
    Metodo: POST
    Parametros en body en formato JSON
        - email (identificador unico)
        - password
        - first name
        - second name 
    Return:
        - resultado de la creacion de usuario
*/
router.post('/add', 
            validate(('createUser')),
            usersController.createUser
);
// TODO: Utilizar un servicio que permita documentar una API correctamente,



/*
    Ruta: /user/auth
    Autentica a un usuario ya registrado
    Metodo: POST
    Parametros en body en formato JSON
        - email
        - password
    Return:
        - token de autenticación (validez 2 hs)
*/
router.post('/auth',
            validate(('authUser')),     // Valido campos
            usersController.authUser    // Proceso request
);

// TODO: Utilizar un servicio que permita documentar una API correctamente,




// Exporto el router  
module.exports = router;    