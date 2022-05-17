const { response } = require("express");
const Usuario = require('../models/usuario');

const getUsuarios = async ( req, res = response ) => {

    const desde = Number( req.query.desde ) || 0;

    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })//usuarios con id diferente al id del request
        .sort('-online')
        .skip( desde )
        .limit( 20 );



    res.json({
        ok: true,
        usuarios
    });
}



module.exports = {
    getUsuarios
}