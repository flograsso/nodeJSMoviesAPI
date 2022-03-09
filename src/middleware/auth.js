// auth.js
// Middelware para validar el token de autenticacion

const jwt = require("jsonwebtoken");

const config = process.env;

/**
* Funcion para verificar si el token que llega por header (access-token) es valido
*/
const verifyToken = function (req, res)
{   
    token = req.headers['access-token'] // Leo el parametro del header
    if (token) // Si existe el parámetro
    {
        try {
            const decoded = jwt.verify(token, config.AUTH_TOKEN_KEY); // Valido token
            } 
        catch (err) {
            return res.status(401).send("Invalid Token");
            }
    }
    else 
        res.send("Missing token");
}


module.exports = verifyToken
