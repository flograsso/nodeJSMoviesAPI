// usersController.js
// Controller de users

const jwt = require("jsonwebtoken"); // Para manejar token de autorizacion
const bcrypt = require('bcrypt');   // Para encriptar la password

// Hashing config
const saltRounds = 10;
const yourPassword = "VM_~DTQ8<m..6Kn";

// Manejador de filesystem
const {fsPush, fsRead, fsWrite} = require('../utils/filesystem');

const { validationResult } = require('express-validator');

const usersController = {};


/**
* Funcion que valida si las credenciales de un usuario son validas y genera el token de autenticacion
* @return    {JSON} access-token      token de autenticacion
*/
usersController.authUser = async (req, response) => {
    try {
        const errors = validationResult(req); // Busco errores de validacion
        if (!errors.isEmpty()) {
            console.log("Error")
            response.status(422).json({ errors: errors.array() });
            return;
        }
        const { email, password } = req.body;
        const user = await userExist(email); // Valido existencia del email
        if ((user == undefined))
            response.status(400).send("User not exists") 
        else
            {
                // Comparo hash guardado en archivo con hash de la password del request
                bcrypt.compare(password,user.password, async function(err, res) { 
                    if (res == true)
                    {
                        console.log("Usuario autenticado")
                        // Creo token
                        const token = jwt.sign(
                            { 
                                user_id: user._id, email },
                                process.env.AUTH_TOKEN_KEY,
                            {
                            expiresIn: "2h",
                            }
                        );
                        // Envio token
                        response.status(200).json(JSON.parse('{"access-token":"'.concat(token). concat('"}')))
                    }
                    else 
                        response.status(400).send("Incorrect password") 
                    
                        
                });                  
            }
 
       
        } 
        catch(err) {
            console.log(err)
        }
}


/**
* Funcion que registra un nuevo usuario y lo almacena en archivo
*/
usersController.createUser = async (req, res) => {
    try {
        const errors = validationResult(req); // Busco errores de validacion
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const user = await userExist(req.body.email) // Valido existencia del email
        if (user !== undefined)
            res.status(409).send("User already exists") // SI el email ya existe no lo registro
        else
        {
            bcrypt.hash(req.body.password, saltRounds, async (err, hash) => { // Hasheo la password
                req.body.password = hash;
                await fsPush(process.env.USERS_FILE_PATH,req.body) //Guardo el user en DB con la password hasheada
            });
            res.status(201).send("User created successfully") 
        }

        } 
        catch(err) {
            console.log(err)
        }
}



/**
* Valido que el usuario exista
* @param    {String} email      identificador del usuario (email)
* @return   {Objet}             retorna el usuario buscado (si existe)
*/
async function userExist(email){
    const data = await fsRead(process.env.USERS_FILE_PATH); // Leo la DB de users
    const filteredResult = data.find((e) => e.email == email); // Filtro por email (identificador del user) 

    // Si obtengo un resultado del filtro, retorno un objeto con los datos del usuario. Sino el objeto es indefinido.
    return filteredResult 
}


module.exports = usersController;
