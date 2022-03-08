const express = require('express');
const router = express.Router();

// define the about route
router.get('/list', function(req, res) {
    res.send('List favourites');
  });


// Exporto el router  
module.exports = router;  