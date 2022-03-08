const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();

const usersController = require('../controllers/usersController');


// define the about route
router.get('/list', function(req, res) {
    console.log("hola");
    usersController.getUsers(req,res);
});



router.post('/add', 
            usersController.validate(('createUser')),
            usersController.createUser
);

router.post('/auth',
            usersController.validate(('authUser')),
            usersController.authUser
);




// Exporto el router  
module.exports = router;    