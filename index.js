const express = require('express');

// Crear el servidor de express
const app = express();

// Directorio publico
app.use( express.static('public') )


// Rutas
/*app.get('/', (req, res) => {
    console.log('Se requiere el /')
    res.json({
        ok: true
    })
})*/


// Escuchar peticiones
app.listen( 4000, () => {
    console.log(`Servidor corriendo en el puerto ${ 4000 }`)
})