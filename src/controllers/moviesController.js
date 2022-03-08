// Utilizo axios para hacer request a url externas
const axios = require('axios');

// URL donde hago el request de las peliculas
const getMoviesURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc?&api_key=';

// Api Key generada de IMDB
const IMDBApiKey = '2af772df821443ec882252df3de8957b';

const moviesController = {};


moviesController.getMovies = function(request,response) {
    // 
    if (request.query.keyword !== undefined)
        console.log(request.query.keyword)
    else
        console.log("vacio");
    // Obtengo las peliculas
    axios.get(getMoviesURL.concat(IMDBApiKey)).then( function(res){
            // Obtengo los resultados de la query
            const movies = res.data.results;
            
            // Itero sobre ellos
            for(movie of movies) {
                // Agrego el campo suggestionScore con un valor random (0..99)
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