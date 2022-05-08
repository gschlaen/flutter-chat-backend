const express = require('express');
const path = require('path');
// Para leer el archivo .env y establecer las variables de entorno
require('dotenv').config();


// DB Config
const { dbConnection } = require('./database/config'); //Aca se importa
dbConnection(); //Aca se utiliza la funcion

// En una sola linea
// require('./database/config').dbConnection();

// App de Express
const app = express();

// Lectura y parseo de body de peticion
app.use( express.json() );

// Node Server
// Levanta server con la configuracion seteada en app 
// y le anexa la aplicacion de sockets
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');



// Public path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Mis rutas
app.use( '/api/login', require('./routes/auth') );


server.listen(process.env.PORT, (err) =>{

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', 3000);
    
})