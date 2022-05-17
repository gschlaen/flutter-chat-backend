const {io} = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');


// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    // console.log(client.handshake.headers['x-token']);
    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] );
    // Verificar autenticacion
    // console.log(valido, uid);
    if (!valido) { return client.disconnect(); }
    
    // Cliente autenticado
    usuarioConectado( uid );

    // Ingresar al usuario a una sala en particular
    client.join( uid );

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async ( payload ) => {
        // TODO: Grabar mensaje
        await grabarMensaje( payload );
        // Espera a que se grabe en la BBDD para hacer el emit
        io.to( payload.para ).emit('mensaje-personal', payload);
    });


    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
        usuarioDesconectado( uid );
    });


    client.on('mensaje', (payload) => {
         console.log('Mensaje!!!', payload);

         io.emit('mensaje', {admin:'Nuevo mensaje'});
         
     });
  });