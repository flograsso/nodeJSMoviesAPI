
// DEBUG
const morgan = require ('morgan');

const app = require('./app');

//DEBUG
app.use(morgan('dev'));
// Inicio servidor
app.listen(app.get('port'), function() {
    console.log(`Inicio servidor en puerto: ${app.get('port')}`)
  })