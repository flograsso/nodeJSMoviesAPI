// auth.js
// Middelware para validar el token de autenticacion

const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");


const config = process.env;

/**
* Funcion para verificar si el token que llega por header (access-token) es valido
* Deja en res.locals.email el email del usuario registrado
*/
const verifyToken = function (req, res, next)
{   
    try{
        token = req.headers['access-token'] // Leo el parametro del header
        if (token) // Si existe el parámetro
        {
            try {
                const decoded = jwt.verify(token, config.AUTH_TOKEN_KEY); // Valido token
                var readed = jwt_decode(token);
                res.locals.email = readed.email;
                } 
            catch (err) {
                //console.log(err);
                return res.status(401).json(JSON.parse('{"message":"Invalid Token"}'))
                }
            return next();
        }
        else 
            return res.status(401).json(JSON.parse('{"message":"Missing auth token"}'))
    }
    catch (err) {
            console.log('Error: ', err.message);
            return res.status(400).json(JSON.parse('{"message":"Error"}'))
        }
}


module.exports = verifyToken
