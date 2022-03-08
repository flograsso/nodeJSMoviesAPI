const express = require('express');
const router = express.Router();
const {getMovies} = require('../controllers/moviesController');




router.get('/list', function(request, response) {
    console.log("hola");
    getMovies(request, response);
});

router.get('/list:keyword', function(request, response) {
    response.send(keyword);
});


// Exporto el router  
module.exports = router;  