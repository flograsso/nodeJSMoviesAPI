// moviesController.js
// Controller de movies

// Utilizo axios para hacer request a url externas
const axios = require('axios');


// URL donde hago el request de las peliculas
const getMoviesURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc?&api_key=';

const moviesController = {};

/**
* Funcion que consulta en IMDB las peliculas mas populares y las retorna.
* Opcional: las filtra por el campo "title" segun la keyword pasada como parámetro
*/
moviesController.getMovies = async function(request,response) {
    // Obtengo las peliculas de IMDB
    await axios.get(getMoviesURL.concat(process.env.IMDB_APIKEY)).then( function(res){
            // Obtengo los resultados de la query
            var movies = res.data.results;

            // Si se envio el parametro de filtro keyword
            if (request.query.keyword)
                // Filtro las peliculas segun su title
                movies = movies.filter(movie  => movie.title.includes(request.query.keyword));
            
            for(movie of movies) {
                // Itero sobre las peliculas y agrego el campo suggestionScore con un valor random (0..99)
                movie.suggestionScore = Math.floor(Math.random() * 100);
            }
            
            // Ordeno de forma descendente por campo suggestionScore
            movies.sort(function(a, b){return a.suggestionScore - b.suggestionScore});
            
            // Devuelvo los resultados en formato JSON
            response.json(movies);

    })
    .catch(err => {
      console.log('Error: ', err.message);
    });

}



// Exporto el controlador
module.exports =  moviesController;