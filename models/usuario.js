const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },


});

// Extrae del usuario __v y password que no quiero que se muestren
// y extrae y renombra _id para que tenga el nombre que yo quiero
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object
});

module.exports = model('Usuario', UsuarioSchema);