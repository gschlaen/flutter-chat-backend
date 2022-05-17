/*
    path: api/mensajes
*/
const { Router } = require('express');
const { getChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



// Ruta, middleware, controlador
router.get('/:de', validarJWT, getChat);




module.exports = router;