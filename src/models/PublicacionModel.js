const { Schema, model } = require('mongoose');

const PublicacionSchema = new Schema({
    titulo: String,
    contenido: String,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
    },


});

const PublicacionModel = model('publicacion', PublicacionSchema);


module.exports = PublicacionModel;