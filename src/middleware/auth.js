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
            return res.status(401).send("Invalid Token");
            }
        return next();
    }
    else 
        res.send("Missing token");
}


module.exports = verifyToken
