const express = require('express');

require('dotenv').config();

// Crear el servidor de express
const app = express();

// Lectura y parseo del body
app.use( express.json() );

// Directorio publico
app.use( express.static('public') )


// Rutas
app.use( '/api/auth', require('./routes/auth') );
// TODO CRUD: Eventos


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
})