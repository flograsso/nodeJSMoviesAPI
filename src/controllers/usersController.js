const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const token_key = 'hW7CzHrhSqRT8sG4';
const yourPassword = "VM_~DTQ8<m..6Kn";

const {fsPush, fsRead, fsWrite} = require('../utils/filesystem');

const { body, validationResult } = require('express-validator');

const usersFilePath = 'src/data/users.txt'
const usersController = {};


usersController.getUsers = async function(req,res) {
    var data = await fsRead(usersFilePath);
    console.log(data);

    res.json(data);
}



usersController.validate = function(method,req) {
  switch (method) {
    case 'createUser': {
     return [ 
        body('firstName', 'Nombre inexistente').exists(),
        body('lastName', 'Apellido inexistente').exists(),
        body('email', 'Email invalido').exists().isEmail(),
        body('password', 'Apellido inexistente').exists()
       ]   
    }
    case 'authUser': {
        return [ 
           body('email', 'Email invalido').exists().isEmail(),
           body('password', 'Apellido inexistente').exists()
          ]   
       }
  }
}

usersController.authUser = async (req, response) => {
    try {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (!errors.isEmpty()) {
             console.log("Error")
             response.status(422).json({ errors: errors.array() });
            return;
       }
       const { email, password } = req.body;
       const user = await userExist(email)
        if ((user == undefined))
        response.status(400).send("User not exists") 
        else
            {
                    bcrypt.compare(password,user.password, async function(err, res) {
                    console.log(password);
                    console.log(user.password);
                    if (res == true)
                    {
                        console.log("Usuario autenticado")
                              // Create token
                        const token = jwt.sign(
                            { 
                                user_id: user._id, email },
                                token_key,
                            {
                            expiresIn: "2h",
                            }
                        );
                        const users = await fsRead(usersFilePath); // Leo la DB de users
                        var foundIndex = users.findIndex(x => x.email == email);
                        users[foundIndex].token = token;
                        await fsWrite(usersFilePath,users)

                        response.status(200).send("User authenticated")
                    }
                    else 
                    {
                        console.log("Incorrect password") 
                        response.status(400).send("Incorrect password") 
                    }
                    
                    });
                    //await fsWrite(usersFilePath,req.body) //Guardo el user en DB
                    
                
         }
 
       
    } catch(err) {
      //return next(err)
    }
 }


usersController.createUser = async (req, res) => {
   try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
      if (!errors.isEmpty()) {
        console.log("Error")
        res.status(422).json({ errors: errors.array() });
       
        return;
      }
      const user = await userExist(req.body.email)
      if (user !== undefined)
        res.status(400).send("User already exists") 
        else
        {
            bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                var plainPsw = req.body.password
                req.body.password = hash;
                req.body.token = '';
                await fsPush(usersFilePath,req.body) //Guardo el user en DB
                });
            res.status(201).send("User created successfully") //Status 201: created
        }

   } catch(err) {
     //return next(err)
   }
}
/*
* Agrego un usuario a la DB , si el mismo no existe en ella.
*/
usersController.addUser = function (req,res) {
    

        

}

/**
* Valido que el usuario exista
* @param    {String} email      identificador del usuario (email)
* @return   {Objet}             retorna el usuario buscado (si existe)
*/
async function userExist(email){
    const data = await fsRead(usersFilePath); // Leo la DB de users
    const filteredResult = data.find((e) => e.email == email); // Filtro por email (identificador del user) 
    // Si obtengo un resultado del filtro, el usuario existe. Retorno TRUE si NO es undefined
    console.log(filteredResult);
    return filteredResult 
}






module.exports = usersController;
