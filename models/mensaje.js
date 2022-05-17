const { Schema, model} = require('mongoose');

const MensajeSchema = Schema({

    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }

}, {   
   timestamps: true 
});

// Extrae del usuario __v y password que no quiero que se muestren
// y extrae y renombra _id para que tenga el nombre que yo quiero
MensajeSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    return object
});

module.exports = model('Mensaje', MensajeSchema);