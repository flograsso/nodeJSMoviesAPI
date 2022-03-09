// index.js

const app = require('./app');

// Inicio servidor
app.listen(process.env.PORT, function() {
    console.log(`Inicio servidor en puerto: ${process.env.PORT}`)
  })