// validate.js
// Middelware para validar parametros de un request 

const {body } = require('express-validator');

/**
* Funcion para validar parametros de un request 
* @param    {Object} req       request
* @param    {String} method    método a validar
*/
validate = function(method,req) {
    switch (method) {
        case 'createUser': {
            return  [ 
                body('firstName', 'Invalid first name').exists(),
                body('lastName', 'Invalid second name').exists(),
                body('email', 'Invalid email').exists().isEmail(),
                body('password', 'Invalid password').exists()
                    ]   
        }
        case 'authUser': {
            return  [ 
                body('email', 'Invalid email').exists().isEmail(),
                body('password', 'Invalid password').exists(),
                    ]   
            }
        }   
}

module.exports = validate;