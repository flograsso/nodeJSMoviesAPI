// favouritesController.js
// Controller de favourites

const { validationResult } = require('express-validator');
const {fsPush, fsRead, fsWrite} = require('../utils/filesystem');


const favouritesController = {};


/**
* Funcion que agrega una pelicula favorita a la lista de peliculas favoritas del usuario autenticado
*/
favouritesController.addMovie = async (req, res) => {

    const errors = validationResult(req); // Busco errores de validacion
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Tomo el id del user que hizo el request
    const email = res.locals.email;

    var newMovie = req.body;

    // Leo todo el archivo de favoritos
    const favourites = await fsRead(process.env.FAVOURITES_FILE_PATH); 

    // Busco en el archivo de favoritos un objeto con el email de usuario
    var foundIndex = favourites.findIndex(x => x.email == email);

    // Si el usuario esta en la base de favoritos
    if (foundIndex !== -1)
    {
        // Me quedo con el array de favoritos
        var userFavorites = favourites[foundIndex].movies;

        // Busco el id de la pelicula a registrar en el arreglo
        var movieId = userFavorites.findIndex(x => x.id == newMovie.id);

        // Si el ID ya existe
        if (movieId !== -1)
            return res.status(400).json(JSON.parse('{"message":"'.concat("Movie ID already exists"). concat('"}')))
        else //Si el ID no existe
            {
                // Agrego la fecha actual
                newMovie.addedAt = getActualDDMMAAAA();

                // Guardo en el objeto
                userFavorites.push(req.body);

                // Reemplazo el array de favoritos por el nuevo con la pelicula agregada
                favourites.movies = userFavorites;
            }
    }
    else // Si el usuario no esta en la base de favoritos
        {   
            var newUser = {}
            newUser.email = email;
            newMovie.addedAt = getActualDDMMAAAA();
            newUser.movies = [];
            newUser.movies[0] = newMovie;

            favourites.push(newUser)
        }

    // Guardo en archivo
    await fsWrite(process.env.FAVOURITES_FILE_PATH ,favourites);
    return res.status(201).json(JSON.parse('{"message":"Movie added to favourites"}'));
}

/**
* Funcion que lista las peliculas favoritas del usuario autenticado
*/
favouritesController.getMovies = async (req, res) => {


    // Tomo el id del user que hizo el request
    const email = res.locals.email;

    // Leo todo el archivo de favoritos
    const favourites = await fsRead(process.env.FAVOURITES_FILE_PATH); 

    // Busco en el archivo de favoritos un objeto con el email de usuario
    var foundIndex = favourites.findIndex(x => x.email == email);

    // Si el usuario esta en la base de favoritos
    if (foundIndex !== -1)
    {
        // Me quedo con el array de favoritos
        var userFavorites = favourites[foundIndex].movies;

        for(movie of userFavorites) {
            // Itero sobre las peliculas y agrego el campo suggestionScore con un valor random (0..99)
            movie.suggestionScore = Math.floor(Math.random() * 100);
        }

        // Ordeno de forma descendente por campo suggestionScore
        userFavorites.sort(function(a, b){return a.suggestionScore - b.suggestionScore});
            
        // Devuelvo los resultados en formato JSON
        res.json(userFavorites);
    }
    else // Si el usuario no esta en la base de favoritos
        return response.status(400).json(JSON.parse('{"message":"'.concat("User not exists"). concat('"}')))

    
}

/**
* Funcion que retorna la fecha actual en formato DD/MM/AAAA
* @return   {String} content    fecha actual en formato DD/MM/AAAA
*/
function getActualDDMMAAAA()
{
    const fecha = new Date(Date.now());
    var dd = fecha.getDate();
    var mm = fecha.getMonth() + 1; // Sumo uno ya que empieza en cero

    var yyyy = fecha.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return  dd + '/' + mm + '/' + yyyy;
}

module.exports = favouritesController;
